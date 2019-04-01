'use strict';

const ClarkPlugin = require('./lib/clark-plugin');

module.exports = {
  name: require('./package').name,

  createCssModulesPlugin(parent) {
    return new ClarkPlugin(parent);
  }
};
