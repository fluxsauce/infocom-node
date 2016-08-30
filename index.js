'use strict';

const debug = require('debug')('http');
const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const restify = require('restify');

const Genres = require('./lib/genres');
const Difficulties = require('./lib/difficulties');
const Games = require('./lib/games');

function startServer(genres, difficulties, games) {
  const server = restify.createServer({
    name: 'Infocom',
  });
  server.get('/difficulties', (req, res, next) => difficulties.respondDifficulties(req, res, next));
  server.get('/difficulties/:id', (req, res, next) =>
    difficulties.respondDifficultyById(req, res, next)
  );
  server.get('/games', (req, res, next) => games.respondGames(req, res, next));
  server.get('/games/:id', (req, res, next) => games.respondGameById(req, res, next));
  server.get('/genres', (req, res, next) => genres.respondGenres(req, res, next));
  server.get('/genres/:id', (req, res, next) => genres.respondGenreById(req, res, next));

  server.listen(8080, () => debug('%s listening at %s', server.name, server.url));
}

fs.readFile(`${__dirname}/assets/games.csv`, 'utf8', (err, data) => {
  if (err) {
    throw err;
  }
  const gamesRaw = parse(data, {
    columns: true,
  });

  const genres = new Genres(gamesRaw);
  const difficulties = new Difficulties(gamesRaw);
  const games = new Games(gamesRaw, genres, difficulties);

  startServer(genres, difficulties, games);
});
