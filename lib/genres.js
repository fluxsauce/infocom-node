'use strict';

const array = require('lodash/array');
const Response = require('./response.js');
const Sequelize = require('sequelize');
const Promise = require('bluebird');

module.exports = class Genres extends Response {
  constructor(gamesRaw, db) {
    super();

    this.model = db.sequelize.define('genre', {
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

    this.model.sync({ force: true })
      .then(() => {
        Promise.map(genres, (name) => {
          this.model.create({ name });
        });
      });
  }
};
