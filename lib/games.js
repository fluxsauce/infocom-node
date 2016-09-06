'use strict';

const Response = require('../lib/response.js');
const Models = require('../models');

module.exports = class Games extends Response {
  constructor() {
    super();
    this.model = 'Game';
    this.include = [
      { model: Models.Difficulty },
      { model: Models.Genre },
    ];
  }
};
