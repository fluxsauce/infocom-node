'use strict';

const debug = require('debug')('infocom:response');
const Models = require('../models');
const restify = require('restify');

module.exports = class Response {
  constructor() {
    this.include = [];
  }

  respondById(req, res, next) {
    const requestId = parseInt(req.params.id, 10);
    if (isNaN(requestId)) {
      next(new restify.errors.NotFoundError('Invalid identifier.'));
    } else {
      Models[this.model].findOne({
        where: {
          id: requestId,
        },
        include: this.include,
      }).then(data => {
        if (data === null) {
          next(new restify.errors.NotFoundError('Not found.'));
        } else {
          res.send(data);
          next();
        }
      });
    }
  }

  respondAll(req, res, next) {
    debug('respondAll');
    Models[this.model].findAll({
      include: this.include,
      limit: req.query.limit,
    }).then(data => res.send(data));
    next();
  }
};
