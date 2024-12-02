// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        ignores: [
            'node_modules',
            'dist',
            'eslint.config.mjs',
            'jest.config.js',
            'coverage',
            'app.test.js',
            'scripts',
        ],
    },
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            /*   'dot-notation': 'error',
            'no-console': 'error', */
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-misused-promises': 'off',
        },
    },
);
