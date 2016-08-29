'use strict';

const debug = require('debug')('infocom:difficulties');
const restify = require('restify');

module.exports = class Difficulties {
  constructor(games_raw) {
    // Parse out only Difficulties.
    this.difficulties = games_raw.map((currentValue, index) => ({
      id: index,
      name: currentValue.difficulty
    }));

    // Unique values.
    let flags = {}
    this.difficulties = this.difficulties.filter((difficulty) => flags[difficulty.name] ? false : flags[difficulty.name] = true);
  }

  getDifficultyIdByName(name) {
    const difficulty = this.difficulties.filter((item) => (item.name === name));
    if (difficulty.length) {
      return difficulty[0].id;
    }
  }

  respondDifficultyById(req, res, next) {
    const difficulty = this.difficulties.filter(function(item) {
      return (item.id === parseInt(req.params.id));
    })

    if (difficulty.length) {
      debug('respondDifficultyById: found %s', req.params.id);
      res.send(difficulty[0]);
      next();
    }
    else {
      debug('respondDifficultyById not found %s', req.params.id);
      next(new restify.errors.NotFoundError('Difficulty not found.'));
    }
  }

  respondDifficulties(req, res, next) {
    debug('respondDifficulties');
    res.send(this.difficulties);
    next();
  }
}
