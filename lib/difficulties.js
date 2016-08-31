'use strict';

const array = require('lodash/array');
const Response = require('./response.js');

module.exports = class Difficulties extends Response {
  constructor(gamesRaw) {
    super();
    // Parse out only Difficulties.
    this.data = gamesRaw.map((currentValue, index) => ({
      id: index,
      name: currentValue.difficulty,
    }));

    // Unique values.
    this.data = array.uniqWith(this.data, (a, b) => (a.name === b.name));
  }
};
