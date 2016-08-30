'use strict';

const debug = require('debug')('infocom:genres');
const restify = require('restify');
const array = require('lodash/array');

module.exports = class Genres {
  constructor(gamesRaw) {
    // Parse out only Genres.
    this.genres = gamesRaw.map((currentValue, index) => ({
      id: index,
      name: currentValue.genre,
    }));

    // Unique values.
    this.genres = array.uniqWith(this.genres, (a, b) => (a.name === b.name));
  }

  getGenreIdByName(name) {
    const genre = this.genres.filter((item) => (item.name === name));
    if (genre.length) {
      return genre[0].id;
    }
    return null;
  }

  respondGenreById(req, res, next) {
    const genre = this.genres.filter((item) => item.id === parseInt(req.params.id, 10));

    if (genre.length) {
      debug('respondGenreById: found %s', req.params.id);
      res.send(genre[0]);
      next();
    } else {
      debug('respondGenreById not found %s', req.params.id);
      next(new restify.errors.NotFoundError('Genre not found.'));
    }
  }

  respondGenres(req, res, next) {
    debug('respondGenres');
    res.send(this.genres);
    next();
  }
};
