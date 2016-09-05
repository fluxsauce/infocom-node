'use strict';

const array = require('lodash/array');
const Response = require('../lib/response.js');
const Sequelize = require('sequelize');
const Promise = require('bluebird');

module.exports = class Difficulties extends Response {
  constructor(gamesRaw, db) {
    super();

    this.model = db.sequelize.define('difficulty', {
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

    this.model.sync({ force: true })
      .then(() => {
        Promise.map(difficulties, (name) => {
          this.model.create({ name });
        });
      });
  }
};
