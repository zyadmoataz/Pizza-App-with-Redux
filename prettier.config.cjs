/* eslint-disable no-undef */
/** @type {import("prettier").Config} */
const config = {
  singleQuote: true,
  trailingComma: 'all',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.js',
};

module.exports = config;
