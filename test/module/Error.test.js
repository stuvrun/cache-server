/* globals test expect */
const Error = require('../../src/module/Error');

test('A Error is defined', () => {
  expect(Error).toBeDefined();
});

test('A client error message can be instanced', () => {
  const instance = new Error.Client();
  expect(instance).toBeDefined();
});

test('A default error message can be instanced', () => {
  const instance = new Error.Default();
  expect(instance).toBeDefined();
});

test('A server error message can be instanced', () => {
  const instance = new Error.Server();
  expect(instance).toBeDefined();
});
