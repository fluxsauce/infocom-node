"use strict";

var fs = require('fs'),
  parse = require('csv-parse/lib/sync'),
  debug = require('debug')('http'),
  games = [],
  genres = [];

function initGenres(games_raw) {
  // Parse out only Genres.
  genres = games_raw.map(function(currentValue, index) {
    return {
      id: index,
      name: currentValue.genre
    }
  })

  // Unique values.
  let flags = {}
  genres = genres.filter(function(genre) {
    if (flags[genre.name]) {
      return false;
    }
    flags[genre.name] = true;
    return true;
  });
}

function initGames(games_raw) {
  games = games_raw.map(function(currentValue, index) {
    let game = {
      id: index,
      name: currentValue.title,
      year: currentValue.year,
      genre: genres[getGenreIdByName(currentValue.genre)],
      difficulty: currentValue.difficulty,
      description: currentValue.description,
    };

    return game;
  });
}

function getGenreIdByName(name) {
  let genre = genres.filter(function(item) {
    return (item.name === name);
  })

  if (genre.length) {
    return genre[0].id;
  }
}

fs.readFile(__dirname + '/assets/games.csv', 'utf8', (err, data) => {
  if (err) {
    throw err;
  }
  let games_raw = parse(data, {columns: true});
  initGenres(games_raw);
  initGames(games_raw);

  startServer();
});

var restify = require('restify');

function respondGameById(req, res, next) {
  let game = games.filter(function(item) {
    return (item.id === parseInt(req.params.id));
  })

  if (game.length) {
    debug('respondGameById: found %s', req.params.id);
    res.send(game[0]);
    next();
  }
  else {
    debug('respondGameById not found %s', req.params.id);
    next(new restify.errors.NotFoundError('Game not found.'));
  }
}

function respondGenreById(req, res, next) {
  let genre = genres.filter(function(item) {
    return (item.id === parseInt(req.params.id));
  })

  if (genre.length) {
    debug('respondGenreById: found %s', req.params.id);
    res.send(genre[0]);
    next();
  }
  else {
    debug('respondGenreById not found %s', req.params.id);
    next(new restify.errors.NotFoundError('Genre not found.'));
  }
}

function respondGenres(req, res) {
  debug('respondGenres');
  res.send(genres);
}

function respondGames(req, res) {
  debug('respondGames');
  let game_list = games.map(function(item) {
    let game = {
      id: item.id,
      name: item.name
    };
    return game;
  });
  res.send(game_list);
}

function startServer() {
  let server = restify.createServer({
    name: 'Infocom'
  });
  server.get('/games', respondGames);
  server.get('/games/:id', respondGameById);
  server.get('/genres', respondGenres);
  server.get('/genres/:id', respondGenreById);

  server.listen(8080, function() {
    debug('%s listening at %s', server.name, server.url);
  });
}
