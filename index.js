'use strict';

const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const Genres = require('./lib/genres');
const Difficulties = require('./lib/difficulties');
const Games = require('./lib/games');
const Server = require('./lib/server');
const Db = require('./lib/db.js');

fs.readFile(`${__dirname}/assets/games.csv`, 'utf8', (err, data) => {
  if (err) {
    throw err;
  }
  const gamesRaw = parse(data, {
    columns: true,
  });

  const db = new Db('database.sqlite3');

  const genres = new Genres(gamesRaw, db);
  const difficulties = new Difficulties(gamesRaw);
  const games = new Games(gamesRaw, genres, difficulties);
  const server = new Server(genres, difficulties, games);

  server.listen();
});
