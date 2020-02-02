/* globals test expect */
const Config = require('../../src/model/Config');

test('An config model is defined', () => {
  expect(Config).toBeDefined();
});

test('A config model can be instanced', () => {
  const instance = new Config();
  expect(instance).toBeDefined();
});

test('A config model can be parsed to string', () => {
  const instance = new Config();
  expect(instance.toString()).toBe('{"port":11211,"version":"1.0.0"}');
});

test('A config model has a default port', () => {
  const instance = new Config();
  expect(instance.port).toBe(11211);
});
