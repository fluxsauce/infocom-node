"use strict";

const debug = require('debug')('http');
const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const restify = require('restify');

const Games = require('./lib/games');
const Genres = require('./lib/genres');

var genres;
var games;

fs.readFile(`${__dirname}/assets/games.csv`, 'utf8', (err, data) => {
  if (err) {
    throw err;
  }
  let games_raw = parse(data, {columns: true});
  genres = new Genres(games_raw);

  games = new Games(games_raw, genres);

  startServer();
});

function startServer() {
  const server = restify.createServer({
    name: 'Infocom'
  });
  server.get('/games', (req, res, next) => games.respondGames(req, res, next));
  server.get('/games/:id', (req, res, next) => games.respondGameById(req, res, next));
  server.get('/genres', (req, res, next) => genres.respondGenres(req, res, next));
  server.get('/genres/:id', (req, res, next) => genres.respondGenreById(req, res, next));

  server.listen(8080, () => debug('%s listening at %s', server.name, server.url));
}
