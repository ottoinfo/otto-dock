module.exports = {
  extends: [
    "airbnb",
    "standard",
    "standard-react",
    "plugin:flowtype/recommended"
  ],
  parser: "babel-eslint",
  plugins: ["react", "jsx-a11y", "import", "flowtype"],
  rules: {
    "class-methods-use-this": 0,
    "comma-dangle": ["error", "always-multiline"],
    "function-paren-newline": "off", //['error', 'never'] https://github.com/eslint/eslint/issues/9411
    "global-require": 0,
    "implicit-arrow-linebreak": 0,
    "import/no-cycle": 1,
    "import/no-named-as-default": 0,
    "import/prefer-default-export": 0,
    "jsx-a11y/alt-text": 0,
    "jsx-a11y/anchor-is-valid": 1,
    "jsx-a11y/label-has-for": [
      2,
      {
        components: ["Label"],
        required: {
          some: ["nesting", "id"]
        },
        allowChildren: false
      }
    ],
    "lines-between-class-members": 0,
    "max-len": [
      2,
      100,
      {
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true
      }
    ],
    "node/no-deprecated-api": 1,
    "no-console": 1,
    "no-else-return": 0,
    "no-nested-ternary": 1,
    "no-param-reassign": 0,
    "no-plusplus": 0,
    "no-restricted-globals": 1,
    "no-throw-literal": 0,
    "object-curly-newline": 0,
    "prefer-destructuring": 1,
    "react/default-props-match-prop-types": 0,
    "react/destructuring-assignment": 0,
    "react/jsx-closing-tag-location": 1,
    "react/jsx-filename-extension": 0,
    "react/jsx-one-expression-per-line": 0,
    "react/jsx-wrap-multilines": 0,
    "react/no-access-state-in-setstate": 0,
    "react/no-array-index-key": 0,
    "react/no-did-mount-set-state": 0,
    "react/no-multi-comp": 0,
    "react/no-unused-prop-types": 0,
    "react/prop-types": 0,
    "react/require-default-props": 0,
    "react/sort-comp": 0
  },
  settings: {
    "import/resolver": {
      "babel-module": {}
    }
  },
  env: {
    browser: true,
    node: true,
    jest: true
  }
};
