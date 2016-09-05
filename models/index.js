'use strict';

const Sequelize = require('sequelize');
const path = require('path');

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

// Games have Genres.
db.GameGenre = sequelize.define('game_genre');
db.Game.belongsToMany(db.Genre, { through: db.GameGenre });
db.Genre.belongsToMany(db.Game, { through: db.GameGenre });

// Games have Difficulties.
db.GameDifficulty = sequelize.define('game_difficulty');
db.Game.belongsToMany(db.Difficulty, { through: db.GameDifficulty });
db.Difficulty.belongsToMany(db.Game, { through: db.GameDifficulty });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
