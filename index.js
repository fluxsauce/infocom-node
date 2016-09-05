'use strict';

const Genres = require('./lib/genres');
const Server = require('./lib/server');

const genres = new Genres();
const server = new Server(genres);
server.listen();
