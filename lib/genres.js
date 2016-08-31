'use strict';

const array = require('lodash/array');
const Response = require('./response.js');

module.exports = class Genres extends Response {
  constructor(gamesRaw) {
    super();
    // Parse out only Genres.
    this.data = gamesRaw.map((currentValue, index) => ({
      id: index,
      name: currentValue.genre,
    }));

    // Unique values.
    this.data = array.uniqWith(this.data, (a, b) => (a.name === b.name));
  }
};
