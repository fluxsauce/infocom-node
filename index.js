'use strict';

const Genres = require('./lib/genres');
const Difficulties = require('./lib/difficulties');
const Server = require('./lib/server');

const genres = new Genres();
const difficulties = new Difficulties();
const server = new Server(genres, difficulties);
server.listen();
