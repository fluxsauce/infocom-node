"use strict";

var fs = require('fs'),
  parse = require('csv-parse/lib/sync'),
  debug = require('debug')('http'),
  games = [];

fs.readFile(__dirname + '/assets/games.csv', 'utf8', (err, data) => {
  if (err) {
    throw err;
  }
  games = parse(data, {columns: true});
  startServer();
});

var restify = require('restify');

function respondGameByTitle(req, res, next) {
  let game = games.filter(function(item) {
    return (item.title === req.params.title);
  })

  if (game.length) {
    debug('respondGameByTitle: found %s', req.params.title);
    res.send(game[0]);
    next();
  }
  else {
    debug('respondGameByTitle: not found %s', req.params.title);
    next(new restify.errors.NotFoundError('Game not found.'));
  }
}

function startServer() {
  let server = restify.createServer({
    name: 'Infocom'
  });
  server.get('/game/:title', respondGameByTitle);

  server.listen(8080, function() {
    debug('%s listening at %s', server.name, server.url);
  });
}
