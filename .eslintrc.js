module.exports = {
    root: true,
    extends: 'eslint-config-airbnb',
    env: {
        browser: true,
        node: true,
        jest: true,
        es6: true
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: [
        'react',
    ],
    rules: {
        'class-methods-use-this': 0,
        'eol-last': 0,
        'indent': [
            1,
            4,
            {
                'SwitchCase': 1
            }
        ],
        'linebreak-style': 0,
        'max-len': [
            2,
            80,
            4,
            {
                'ignoreUrls': true
            }
        ],
        'newline-per-chained-call': 0,
        'no-alert': 0,
        'no-case-declarations': 0,
        'no-confusing-arrow': 0,
        'no-console': 0,
        'no-debugger': 1,
        'no-lone-blocks': 0,
        'no-trailing-spaces': 0,
        'no-underscore-dangle': 0,
        'no-unused-vars': 0,
        'semi': [
            1,
            'always'
        ],
        'import/default': 0,
        'import/extensions': 0,
        'import/first': 0,
        'import/no-duplicates': 0,
        'import/no-extraneous-dependencies': 0,
        'import/named': 0,
        'import/namespace': [
            0,
            {
                'allowComputed': true
            }
        ],
        'import/no-named-as-default': 0,
        'import/no-named-as-default-member': 0,
        'import/no-unresolved': 2,
        'jsx-a11y/no-marquee': 0,
        'react/display-name': 0,
        'react/forbid-prop-types': 0,
        'react/jsx-boolean-value': 0,
        'react/jsx-filename-extension': 0,
        'react/jsx-indent': [
            1,
            4
        ],
        'react/jsx-indent-props': 0,
        // This is handled by Flow with default values:
        'react/require-default-props': 0,
        'react/self-closing-comp': 1,
        'import/no-webpack-loader-syntax': 0
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: './internals/webpack/webpack.prod.babel.js'
            }
        }
    }
};
