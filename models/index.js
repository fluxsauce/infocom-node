'use strict';

const Sequelize = require('sequelize');
const debug = require('debug')('infocom:models:Genre');
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

// Parse out only Genres.
const genres = array.uniq(gamesRaw.map((currentValue) => currentValue.genre));

db.Genre.sync({ force: true })
  .then(() => genres.map(name => db.Genre.create({ name })));
debug(db.Genre);

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

// Parse out only Difficulties.
const difficulties = array.uniq(gamesRaw.map(
  (currentValue) => (currentValue.difficulty ? currentValue.difficulty : 'None')));

db.Difficulty.sync({ force: true })
  .then(() => difficulties.map(name => db.Difficulty.create({ name })));

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

db.Game.sync({ force: true })
.then(() => gamesRaw.map((currentValue) => (
  db.Game.create({
    name: currentValue.title,
    year: currentValue.year,
    description: currentValue.description,
  }))));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
