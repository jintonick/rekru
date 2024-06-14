const eslint = require('@eslint/js');
const tsEslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');

module.exports = {
    ...eslint.configs.recommended,
    parser: tsParser,
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    overrideConfig: {
        linterOptions: {
            reportUnusedDisableDirectives: true,
        },
    },
    rules: {
        // Ваши правила
    },
};


