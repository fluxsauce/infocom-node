'use strict';

const Response = require('../lib/response.js');

module.exports = class Authors extends Response {
  constructor() {
    super();
    this.model = 'author';
  }
};
