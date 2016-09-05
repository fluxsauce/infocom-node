'use strict';

const fs = require('fs');
const path = require('path');
const parse = require('csv-parse/lib/sync');

const file = fs.readFileSync(path.join(__dirname, '/../assets/games.csv'), 'utf8');

module.exports = parse(file, {
  columns: true,
});
