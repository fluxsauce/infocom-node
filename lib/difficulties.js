'use strict';

const Response = require('../lib/response.js');

module.exports = class Difficulties extends Response {
  constructor() {
    super();
    this.model = 'Difficulty';
  }
};
