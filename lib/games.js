'use strict';

const Models = require('../models');
const Response = require('../lib/response.js');

module.exports = class Games extends Response {
  constructor() {
    super();
    this.data = Models.Game.findAll();
  }
};
