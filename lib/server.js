'use strict';

const debug = require('debug')('http');
const restify = require('restify');
const Genres = require('./genres');
const Difficulties = require('./difficulties');
const Games = require('./games');
const Authors = require('./authors');

module.exports = class Server {
  constructor() {
    const genres = new Genres();
    const difficulties = new Difficulties();
    const games = new Games();
    const authors = new Authors();

    this.server = restify.createServer({
      name: 'Infocom',
      version: '1.0.1',
    });

    this.server.pre(restify.pre.sanitizePath());
    this.server.use(restify.queryParser());

    this.server.get('/authors', (req, res, next) => authors.respondAll(req, res, next));
    this.server.get('/authors/:id', (req, res, next) => authors.respondById(req, res, next));

    this.server.get('/genres', (req, res, next) => genres.respondAll(req, res, next));
    this.server.get('/genres/:id', (req, res, next) => genres.respondById(req, res, next));

    this.server.get('/difficulties', (req, res, next) =>
      difficulties.respondAll(req, res, next)
    );
    this.server.get('/difficulties/:id', (req, res, next) =>
      difficulties.respondById(req, res, next)
    );

    this.server.get('/games', (req, res, next) => games.respondAll(req, res, next));
    this.server.get('/games/:id', (req, res, next) => games.respondById(req, res, next));
  }

  listen() {
    this.server.listen(8080, () => debug('%s listening at %s', this.server.name, this.server.url));
  }
};
