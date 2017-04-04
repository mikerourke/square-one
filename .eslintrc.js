module.exports = {
    root: true,
    extends: [
        'eslint-config-airbnb',
        'plugin:flowtype/recommended',
    ],
    env: {
        browser: true,
        node: true,
        jest: true,
        es6: true,
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: [
        'flowtype',
        'react',
    ],
    rules: {
        'class-methods-use-this': 'off',
        'eol-last': 'off',
        'indent': ['warn', 4, {
            SwitchCase: 1,
        }],
        'linebreak-style': 'off',
        'max-len': ['error', 80, 4, {
            ignoreUrls: true,
            ignoreComments: false,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
        }],
        'newline-per-chained-call': 'off',
        'no-alert': 'off',
        'no-case-declarations': 'off',
        'no-confusing-arrow': 'off',
        'no-console': 'off',
        'no-debugger': 'warn',
        'no-lone-blocks': 'off',
        'no-trailing-spaces': 'off',
        'no-underscore-dangle': 'off',
        'no-unused-vars': ['warn', {
            ignoreRestSiblings: true,
        }],
        'no-use-before-define': 'off', // This causes issues with type declarations.
        'semi': ['warn', 'always'],
        'import/default': 'off',
        'import/extensions': 'off',
        'import/first': 'off',
        'import/no-duplicates': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/named': 'off',
        'import/namespace': ['off', {
            allowComputed: true,
        }],
        'import/no-named-as-default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-unresolved': 'error',
        'import/prefer-default-export': 'off',
        'jsx-a11y/no-marquee': 'off',
        'react/display-name': 'off',
        'react/forbid-prop-types': 'off',
        'react/jsx-boolean-value': 'off',
        'react/jsx-filename-extension': 'off',
        'react/jsx-indent': ['warn', 4],
        'react/jsx-indent-props': 'off',
        'react/no-unused-prop-types': 'off',
        // This is handled by Flow with default values:
        'react/require-default-props': 'off',
        'react/self-closing-comp': 'warn',
        'react/sort-comp': ['warn', {
            order: [
                'type-annotations',
                'static-methods',
                'constructor',
                'lifecycle',
                'everything-else',
                'render',
            ],
        }],
        'import/no-webpack-loader-syntax': 'off',
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: './internals/webpack/webpack.prod.js',
            },
        },
    },
};
