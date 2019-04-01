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

  config(env, baseConfig) {
    const before = [
      // https://github.com/postcss/postcss-mixins
      // Use @define-mixin and @mixin rules
      require('postcss-mixins'),

      // https://github.com/jonathantneal/postcss-pseudo-class-enter
      // Use :enter, which is equal to :hover and :focus combined
      require('postcss-pseudo-class-enter'),

      // https://github.com/jonathantneal/postcss-pseudo-class-any-link
      // Combination of :link and :visited
      require('postcss-pseudo-class-any-link'),

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

      // https://github.com/outpunk/postcss-each
      // Iterate over lists with @each
      require('postcss-each'),

      // https://github.com/antyakushev/postcss-for
      // Iterate over numeric ranges with @for
      require('postcss-for'),

      // https://github.com/andyjansson/postcss-conditionals
      // @if, @else and @else if
      require('postcss-conditionals'),

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

      // https://github.com/postcss/autoprefixer
      // Add vendor prefixes to rules by Can I Use
      require('autoprefixer')({ browsers: this.browsers })
    ];

    for (const [stage, plugins] of Object.entries({ before, after })) {
      this.addPostcssPlugin(baseConfig, stage, ...plugins);
    }

    return {
      postcssOptions: {
        // https://github.com/postcss/postcss-scss
        // This allows you to use inline comments, like this one here.
        syntax: require('postcss-scss')
      }
    };
  }
};
