'use strict';

const ClarkPlugin = require('./lib/clark-plugin');

module.exports = {
  name: require('./package').name,

  shouldIncludeChildAddon(childAddon) {
    if (childAddon.name === 'ember-css-modules') {
      return false;
    }
    return this._super.shouldIncludeChildAddon.call(this, childAddon);
  },

  createCssModulesPlugin(parent) {
    return new ClarkPlugin(parent);
  }
};
