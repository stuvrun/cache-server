/* globals test expect */
const commonError = require('../../src/module/commonError');

test('A commonError is defined', () => {
  expect(commonError).toBeDefined();
});

test('A client error message can be instanced', () => {
  const instance = commonError.client();
  expect(instance).toBeDefined();
});

test('A default error message can be instanced', () => {
  const instance = commonError.default();
  expect(instance).toBeDefined();
});

test('A server error message can be instanced', () => {
  const instance = commonError.server();
  expect(instance).toBeDefined();
});
