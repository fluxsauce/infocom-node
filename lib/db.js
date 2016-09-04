'use strict';

const Sequelize = require('sequelize');

module.exports = class Db {
  constructor(filename) {
    this.sequelize = new Sequelize('database', 'username', 'password', {
      dialect: 'sqlite',
      storage: filename,
    });
  }
};
