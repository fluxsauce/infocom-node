'use strict';

const debug = require('debug')('infocom:games');
const restify = require('restify');

module.exports = class Games {
  constructor(gamesRaw, genres, difficulties) {
    this.games = gamesRaw.map((currentValue, index) => ({
      id: index,
      name: currentValue.title,
      year: currentValue.year,
      genre: genres.genres[genres.getGenreIdByName(currentValue.genre)],
      difficulty: difficulties.difficulties[
        difficulties.getDifficultyIdByName(currentValue.difficulty)],
      description: currentValue.description,
    }));
  }

  getGameIdByName(name) {
    const game = this.games.filter((item) => (item.name === name));
    if (game.length) {
      return game[0].id;
    }
    return null;
  }

  respondGameById(req, res, next) {
    const game = this.games.filter(item => item.id === parseInt(req.params.id, 10));

    if (game.length) {
      debug('respondGameById: found %s', req.params.id);
      res.send(game[0]);
      next();
    } else {
      debug('respondGameById not found %s', req.params.id);
      next(new restify.errors.NotFoundError('Game not found.'));
    }
  }

  respondGames(req, res, next) {
    debug('respondGames');
    res.send(this.games.map((item) => ({
      id: item.id,
      name: item.name,
    })));
    next();
  }
};
