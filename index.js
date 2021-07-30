'use strict';

module.exports = {
  name: require('./package').name,

  shouldIncludeChildAddon(childAddon) {
    if (childAddon.name === 'ember-css-modules') {
      return false;
    }
    return this._super.shouldIncludeChildAddon.call(this, childAddon);
  },

  createCssModulesPlugin(parent) {
    const ClarkPlugin = require('./lib/clark-plugin');
    return new ClarkPlugin(parent);
  },
};
