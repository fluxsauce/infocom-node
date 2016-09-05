'use strict';

const Response = require('../lib/response.js');
const Models = require('../models');

module.exports = class Difficulties extends Response {
  constructor() {
    super();
    this.data = Models.Difficulty.findAll();
  }
};
