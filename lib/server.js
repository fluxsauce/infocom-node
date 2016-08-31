'use strict';

const debug = require('debug')('http');
const restify = require('restify');

module.exports = class Server {
  constructor(genres, difficulties, games) {
    this.server = restify.createServer({
      name: 'Infocom',
    });
    this.server.get('/difficulties', (req, res, next) =>
      difficulties.respondAll(req, res, next)
    );
    this.server.get('/difficulties/:id', (req, res, next) =>
      difficulties.respondById(req, res, next)
    );
    this.server.get('/games', (req, res, next) => games.respondAll(req, res, next));
    this.server.get('/games/:id', (req, res, next) => games.respondById(req, res, next));
    this.server.get('/genres', (req, res, next) => genres.respondAll(req, res, next));
    this.server.get('/genres/:id', (req, res, next) => genres.respondById(req, res, next));
  }

  listen() {
    this.server.listen(8080, () => debug('%s listening at %s', this.server.name, this.server.url));
  }
};