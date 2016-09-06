'use strict';

const Server = require('./lib/server');
const models = require('./models');
const gamesRaw = require('./lib/gamesraw');
const array = require('lodash/array');

function cleanAuthors(authors) {
  const authorsNoSubtitle = authors.replace(/ \(.*\)/g, '');

  const noAnd = [];
  authorsNoSubtitle.split(' and ').map((authorNoAnd) => noAnd.push(authorNoAnd));

  const noComma = [];
  noAnd.map((authorNoAnd) => authorNoAnd.split(', ').map(
    (authorNoComma) => noComma.push(authorNoComma)
  ));
  return noComma;
}

models.sequelize.sync({ force: true }).then(() => {
  // Parse out only Authors.
  const authors =
    gamesRaw.map(
      (currentValue) => cleanAuthors(currentValue.authors)
    )
    .map(authorList => authorList.map(name => name));
  const authorsMerged = authors.reduce((prev, curr) => prev.concat(curr));
  authorsMerged.map(name => models.author.create({ name }));

  // Parse out only Difficulties.
  const difficulties = array.uniq(gamesRaw.map(
    (currentValue) => (currentValue.difficulty ? currentValue.difficulty : 'None')));
  difficulties.map(name => models.difficulty.create({ name }));

  // Parse out only Genres.
  const genres = array.uniq(gamesRaw.map((currentValue) => currentValue.genre));
  genres.map(name => models.genre.create({ name }));

  gamesRaw.map((currentValue) => {
    const game = models.game.build({
      name: currentValue.title,
      year: currentValue.year,
      description: currentValue.description,
    });

    cleanAuthors(currentValue.authors).map(author =>
      models.author.findAll({
        where: {
          name: author,
        },
      }).spread((authorModel) => game.addAuthor(authorModel))
    );

    const genreName = currentValue.genre;
    models.genre.findAll({
      where: {
        name: genreName,
      },
    }).spread((genre) => {
      game.addGenre(genre);
    });

    const difficultyName = currentValue.difficulty;
    models.difficulty.findAll({
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
