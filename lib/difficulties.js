'use strict';

const debug = require('debug')('infocom:difficulties');
const restify = require('restify');
const array = require('lodash/array');

module.exports = class Difficulties {
  constructor(gamesRaw) {
    // Parse out only Difficulties.
    this.difficulties = gamesRaw.map((currentValue, index) => ({
      id: index,
      name: currentValue.difficulty,
    }));

    // Unique values.
    this.difficulties = array.uniqWith(this.difficulties, (a, b) => (a.name === b.name));
  }

  getDifficultyIdByName(name) {
    const difficulty = this.difficulties.filter((item) => (item.name === name));
    if (difficulty.length) {
      return difficulty[0].id;
    }
    return null;
  }

  respondDifficultyById(req, res, next) {
    const difficulty = this.difficulties.filter((item) => item.id === parseInt(req.params.id, 10));

    if (difficulty.length) {
      debug('respondDifficultyById: found %s', req.params.id);
      res.send(difficulty[0]);
      next();
    } else {
      debug('respondDifficultyById not found %s', req.params.id);
      next(new restify.errors.NotFoundError('Difficulty not found.'));
    }
  }

  respondDifficulties(req, res, next) {
    debug('respondDifficulties');
    res.send(this.difficulties);
    next();
  }
};
