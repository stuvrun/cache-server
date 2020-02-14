/* globals test expect */
const Error = require('../../src/module/Error');

test('A Error is defined', () => {
  expect(Error).toBeDefined();
});

test('A base error message can be instanced', () => {
  const instance = new Error.Base();
  expect(instance).toBeDefined();
  expect(instance).toBeInstanceOf(Error.Base);
});

test('A client error message can be instanced', () => {
  const instance = new Error.Client();
  expect(instance).toBeDefined();
  expect(instance).toBeInstanceOf(Error.Client);
});

test('A default error message can be instanced', () => {
  const instance = new Error.Default();
  expect(instance).toBeDefined();
  expect(instance).toBeInstanceOf(Error.Default);
});

test('A server error message can be instanced', () => {
  const instance = new Error.Server();
  expect(instance).toBeDefined();
  expect(instance).toBeInstanceOf(Error.Server);
});
