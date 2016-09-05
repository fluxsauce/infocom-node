'use strict';

const Sequelize = require('sequelize');
const path = require('path');
const gamesRaw = require('../lib/gamesraw');
const array = require('lodash/array');

const db = {};

const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite3'),
});

// Genre.
db.Genre = sequelize.define('genre', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Difficulty.
db.Difficulty = sequelize.define('difficulty', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Game.
db.Game = sequelize.define('game', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// Parse out only Genres.
const genres = array.uniq(gamesRaw.map((currentValue) => currentValue.genre));

db.Genre.sync({ force: true })
  .then(() => genres.map(name => db.Genre.create({ name })));

db.GameGenre = sequelize.define('game_genre');
db.Game.belongsToMany(db.Genre, { through: db.GameGenre });
db.Genre.belongsToMany(db.Game, { through: db.GameGenre });
db.GameGenre.sync({ force: true });

// Parse out only Difficulties.
const difficulties = array.uniq(gamesRaw.map(
  (currentValue) => (currentValue.difficulty ? currentValue.difficulty : 'None')));

db.Difficulty.sync({ force: true })
  .then(() => difficulties.map(name => db.Difficulty.create({ name })));

db.GameDifficulty = sequelize.define('game_difficulty');
db.Game.belongsToMany(db.Difficulty, { through: db.GameDifficulty });
db.Difficulty.belongsToMany(db.Game, { through: db.GameDifficulty });
db.GameDifficulty.sync({ force: true });

// Populate Games.
db.Game.sync({ force: true })
  .then(() => gamesRaw.map((currentValue) => {
    const game = db.Game.build({
      name: currentValue.title,
      year: currentValue.year,
      description: currentValue.description,
    });

    const genreName = currentValue.genre;
    db.Genre.findAll({
      where: {
        name: genreName,
      },
    }).spread((genre) => {
      game.addGenre(genre);
    });

    const difficultyName = currentValue.difficulty;
    db.Difficulty.findAll({
      where: {
        name: difficultyName !== '' ? difficultyName : 'None',
      },
    }).spread((difficulty) => {
      game.addDifficulty(difficulty);
    });

    game.save();

    return game;
  }));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
