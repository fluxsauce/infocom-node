'use strict';

const Server = require('./lib/server');
const models = require('./models');
const gamesRaw = require('./lib/gamesraw');
const array = require('lodash/array');

models.sequelize.sync({ force: true }).then(() => {
  // Parse out only Difficulties.
  const difficulties = array.uniq(gamesRaw.map(
    (currentValue) => (currentValue.difficulty ? currentValue.difficulty : 'None')));

  difficulties.map(name => models.Difficulty.create({ name }));

  // Parse out only Genres.
  const genres = array.uniq(gamesRaw.map((currentValue) => currentValue.genre));
  genres.map(name => models.Genre.create({ name }));

  gamesRaw.map((currentValue) => {
    const game = models.Game.build({
      name: currentValue.title,
      year: currentValue.year,
      description: currentValue.description,
    });

    const genreName = currentValue.genre;
    models.Genre.findAll({
      where: {
        name: genreName,
      },
    }).spread((genre) => {
      game.addGenre(genre);
    });

    const difficultyName = currentValue.difficulty;
    models.Difficulty.findAll({
      where: {
        name: difficultyName !== '' ? difficultyName : 'None',
      },
    }).spread((difficulty) => {
      game.addDifficulty(difficulty);
    });

    return game.save();
  });

  const server = new Server();
  server.listen();
});
