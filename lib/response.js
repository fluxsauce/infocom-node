'use strict';

const debug = require('debug')('infocom:response');
const Models = require('../models');
const restify = require('restify');

module.exports = class Response {
  constructor() {
    this.include = [];
  }

  respondById(req, res, next) {
    debug('respondById');
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
    const requestLimit = parseInt(req.query.limit, 10);
    Models[this.model].findAll({
      include: this.include,
      limit: isNaN(requestLimit) ? null : requestLimit,
    }).then(data => res.send(data));
    next();
  }
};
