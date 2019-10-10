const rc = require('rc');
const qs = require('qs');
const _ = require('lodash');
const defaultConfig = require('../config');

const config = rc('sequelize-search-builder', defaultConfig);

class BuilderAbstract {
  constructor(Sequelize, request = {}) {
    if (new.target === BuilderAbstract) {
      throw new TypeError('Cannot construct BuilderAbstract instances directly');
    }

    this.Sequelize = Sequelize;
    this.request = BuilderAbstract.prepareRequest(request);
    this.setConfig(config);
  }

  setConfig(value) {
    if (value !== null && typeof value === 'object') {
      this.config = _.merge(this.config, value);
    } else {
      console.error('Config parameter should be an object');
    }

    return this;
  }

  static prepareRequest(request = {}) {
    if (typeof request === 'string') {
      return qs.parse(request);
    }

    return request;
  }
}

module.exports = BuilderAbstract;
