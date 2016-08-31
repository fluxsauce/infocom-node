'use strict';

const Response = require('./response.js');

module.exports = class Games extends Response {
  constructor(gamesRaw, genres, difficulties) {
    super();
    this.data = gamesRaw.map((currentValue, index) => ({
      id: index,
      name: currentValue.title,
      year: currentValue.year,
      genre: genres.data[genres.getIdByName(currentValue.genre)],
      difficulty: difficulties.data[
        difficulties.getIdByName(currentValue.difficulty)],
      description: currentValue.description,
    }));
  }
};
