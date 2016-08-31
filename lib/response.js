'use strict';

const debug = require('debug')('infocom:response');
const restify = require('restify');

module.exports = class Response {
  respondById(req, res, next) {
    const target = this.data.filter((item) => item.id === parseInt(req.params.id, 10));

    if (target.length) {
      debug('respondById: found %s', req.params.id);
      res.send(target[0]);
      next();
    } else {
      debug('respondById not found %s', req.params.id);
      next(new restify.errors.NotFoundError('Not found.'));
    }
  }

  getIdByName(name) {
    const target = this.data.filter((item) => (item.name === name));
    if (target.length) {
      return target[0].id;
    }
    return null;
  }

  respondAll(req, res, next) {
    debug('respondAll');
    res.send(this.data);
    next();
  }
};
