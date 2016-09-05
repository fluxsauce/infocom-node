'use strict';

const Response = require('./response.js');
const Models = require('../models');

module.exports = class Genres extends Response {
  constructor() {
    super();
    this.data = Models.Genre.findAll();
  }
};
