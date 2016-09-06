'use strict';

const Response = require('./response.js');

module.exports = class Genres extends Response {
  constructor() {
    super();
    this.model = 'Genre';
  }
};
