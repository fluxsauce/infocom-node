'use strict';

const debug = require('debug')('http');
const restify = require('restify');

class Games {
  constructor(games_raw, genres) {
    this.games = games_raw.map(function(currentValue, index) {
      return {
        id: index,
        name: currentValue.title,
        year: currentValue.year,
        genre: genres.genres[genres.getGenreIdByName(currentValue.genre)],
        difficulty: currentValue.difficulty,
        description: currentValue.description,
      };
    });
  }

  getGameIdByName(name) {
    const game = this.games.filter((item) => (item.name === name));
    if (game.length) {
      return game[0].id;
    }
  }

  respondGameById(req, res, next) {
    const game = this.games.filter(item => item.id === parseInt(req.params.id, 10));

    if (game.length) {
      debug('respondGameById: found %s', req.params.id);
      res.send(game[0]);
      next();
    }
    else {
      debug('respondGameById not found %s', req.params.id);
      next(new restify.errors.NotFoundError('Game not found.'));
    }
  }

  respondGames(req, res) {
    debug('respondGames');
    let game_list = this.games.map(function(item) {
      let game = {
        id: item.id,
        name: item.name
      };
      return game;
    });
    res.send(game_list);
  }
}

module.exports = Games;
