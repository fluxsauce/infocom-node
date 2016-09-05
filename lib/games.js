'use strict';

module.exports = class Games {
  constructor(gamesRaw, genres, difficulties) {
    super();

    this.data = gamesRaw.map((currentValue, index) => ({
      id: index,
      name: currentValue.title,
      year: currentValue.year,
      genre: genres.model.findOne({
        where: {
          title: currentValue.genre,
        },
      }).then((genre) => genre.id),
      /*
      data[genres.getIdByName(currentValue.genre)],
      difficulty: difficulties.data[
        difficulties.getIdByName(currentValue.difficulty)],
        */
      description: currentValue.description,
    }));
  }
};
