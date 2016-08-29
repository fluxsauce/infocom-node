'use strict';

const debug = require('debug')('http');
const restify = require('restify');

class Genres {
  constructor(games_raw) {
    // Parse out only Genres.
    this.genres = games_raw.map((currentValue, index) => ({
      id: index,
      name: currentValue.genre
    }));

    // Unique values.
    let flags = {}
    this.genres = this.genres.filter((genre) => flags[genre.name] ? false : flags[genre.name] = true);
  }

  getGenreIdByName(name) {
    const genre = this.genres.filter((item) => (item.name === name));
    if (genre.length) {
      return genre[0].id;
    }
  }

  respondGenreById(req, res, next) {
    const genre = this.genres.filter(function(item) {
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

  respondGenres(req, res) {
    debug('respondGenres');
    res.send(this.genres);
  }
}

module.exports = Genres;