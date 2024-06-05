import globals from 'globals';
import jsdoc from 'eslint-plugin-jsdoc';
import pluginJs from '@eslint/js';

export default [
  {
    languageOptions: { globals: globals.node },
    plugins: {
      jsdoc: jsdoc,
    },
    rules: {
      camelcase: ['warn', { properties: 'always' }],
      curly: 'error',
      eqeqeq: 'error',
      'max-len': ['error', { code: 120, ignoreTemplateLiterals: true }],
      'max-params': ['error', 3],
      'no-console': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-destructuring': ['error', { array: true, object: true }],
      semi: ['error', 'always'],
      'sort-imports': [
        'error',
        {
          allowSeparatedGroups: false,
          ignoreCase: false,
          ignoreDeclarationSort: false,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        },
      ],
      'sort-vars': 'error',
      'jsdoc/check-alignment': 'error',
      'jsdoc/check-param-names': 'error',
      'jsdoc/check-tag-names': 'error',
      'jsdoc/check-types': 'error',
      'jsdoc/implements-on-classes': 'error',
      'jsdoc/require-description': 'error',
      'jsdoc/require-jsdoc': [
        'error',
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            ArrowFunctionExpression: true,
            FunctionExpression: true,
          },
        },
      ],
      'jsdoc/require-param': 'error',
      'jsdoc/require-param-description': 'error',
      'jsdoc/require-param-name': 'error',
      'jsdoc/require-param-type': 'error',
      'jsdoc/require-returns': 'error',
      'jsdoc/require-returns-check': 'error',
      'jsdoc/require-returns-description': 'error',
      'jsdoc/require-returns-type': 'error',
    },
  },
  pluginJs.configs.recommended,
];
