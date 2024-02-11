/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
  ],
  rules: {
    // These opinionated rules are enabled in stylistic-type-checked above.
    // Feel free to reconfigure them to your own preference.
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",

    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: { attributes: false },
      },
    ],

		// Custom rules
		"semi": ["error", "always"],
		"@typescript-eslint/semi": ["error", "always"],

		"quotes": ["error", "single"],
		"@typescript-eslint/quotes": ["error", "single"],

		"comma-dangle": ["error", "always-multiline"],
		"@typescript-eslint/comma-dangle": ["error", "always-multiline"],

		"indent": ["error", 2],
		"@typescript-eslint/indent": ["error", 2],

    "object-curly-spacing": ["error", "always"],
    "@typescript-eslint/object-curly-spacing": ["error", "always"],

    "array-bracket-spacing": ["error", "always"],
    "@typescript-eslint/array-bracket-spacing": ["error", "always"],
  },
};

module.exports = config;
