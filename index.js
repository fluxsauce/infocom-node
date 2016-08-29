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
  server.get('/games', games.respondGames);
  server.get('/games/:id', games.respondGameById);
  server.get('/genres', genres.respondGenres);
  server.get('/genres/:id', genres.respondGenreById);

  server.listen(8080, () => debug('%s listening at %s', server.name, server.url));
}
