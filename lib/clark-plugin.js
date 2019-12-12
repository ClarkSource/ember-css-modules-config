const Plugin = require('ember-css-modules/lib/plugin');

module.exports = class ClarkPlugin extends Plugin {
  get project() {
    let project = this.parent;
    while (project.parent) {
      project = project.parent;
    }

    return project;
  }

  get browsers() {
    return (this.project.targets && this.project.targets.browsers) || null;
  }

  config(environment, baseConfig) {
    const before = [
      // https://github.com/postcss/postcss-mixins
      // Use @define-mixin and @mixin rules
      require('postcss-mixins'),

      // https://github.com/jonathantneal/postcss-pseudo-class-enter
      // Use :enter, which is equal to :hover and :focus combined
      require('postcss-pseudo-class-enter'),

      // https://github.com/postcss/postcss-custom-selectorsx
      // @custom-selector :--heading h1, h2, h3;
      require('postcss-custom-selectors'),

      // https://github.com/jedmao/postcss-nested-props
      // Nest properties like `font: { size: 10px; family: Helvetica; }`
      // @TODO: https://github.com/jedmao/postcss-nested-props/issues/9
      // require('postcss-nested-props'),

      // https://github.com/toomuchdesign/postcss-nested-ancestors
      // Reference an ancestor in nested rules with ^&
      require('postcss-nested-ancestors'),

      // https://github.com/postcss/postcss-nested
      // Nest rules and reference the parent via &
      require('postcss-nested'),

      // https://github.com/jonathantneal/postcss-advanced-variables
      // @if, @else and @else if
      // Iterate over numeric ranges with @for
      // Iterate over lists with @each
      require('postcss-advanced-variables')({
        disable: '@mixin, @include, @content',
        unresolved: 'ignore'
      }),

      // https://github.com/jonathantneal/postcss-short
      // Shorthand properties
      require('postcss-short')

      // https://github.com/simonsmith/postcss-property-lookup
      // Lookup property values of the current rule set, e.g. padding-top: @margin-bottom
      // @TODO: https://github.com/simonsmith/postcss-property-lookup/pull/27#issuecomment-438264254
      // require('postcss-property-lookup')
    ];
    const after = [
      // https://github.com/postcss/postcss-calc
      // Reduce `calc()` expressions whenever possible
      require('postcss-calc'),

      // https://github.com/postcss/postcss-color-function
      // Transform W3C CSS color function to more compatible CSS
      require('postcss-color-function'),

      // https://github.com/seaneking/postcss-hexrgba
      // Adds shorthand hex methods to rbga() values.
      require('postcss-hexrgba'),

      // https://github.com/larsenwork/postcss-easing-gradients
      // cubic-bezier() for linear-gradient()
      require('postcss-easing-gradients'),

      // https://github.com/csstools/postcss-preset-env
      // Adds vendor prefixes based on Can I Use and polyfills new features
      // Inspired by https://github.com/moxystudio/postcss-preset-moxy/blob/master/index.js
      require('postcss-preset-env')({
        browsers: this.browsers,

        // https://cssdb.org/
        stage: 4,

        // Disable `preserve` so that the resulting CSS is consistent among all
        // browsers, diminishing the probability of discovering bugs only when
        // testing in older browsers.
        preserve: false,

        // Explicitly enable features that we want, despite being proposals yet.
        features: {
          'custom-properties': true,
          'custom-media-queries': true,
          'nesting-rules': true,
          'pseudo-class-any-link': true
        },

        autoprefixer: {
          // We don't manually apply prefixes unless they are really necessary,
          // e.g.when dealing with quirks, therefore we disable removing them.
          remove: false
        }
      })
    ];

    for (const [stage, plugins] of Object.entries({ before, after })) {
      this.addPostcssPlugin(baseConfig, stage, ...plugins);
    }

    return {
      postcssOptions: {
        // https://github.com/postcss/postcss-scss
        // This allows you to use inline comments, like this one here.
        parser: require('postcss-scss')
      }
    };
  }
};
