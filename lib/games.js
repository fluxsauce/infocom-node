'use strict';

const Response = require('../lib/response.js');
const Models = require('../models');

module.exports = class Games extends Response {
  constructor() {
    super();
    this.model = 'game';
    this.include = [
      { model: Models.difficulty, required: true, attributes: ['name'] },
      { model: Models.genre, required: true, attributes: ['name'] },
    ];
  }
};
