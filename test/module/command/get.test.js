/* globals test expect */
const data = require('../../global/data');
const Error = require('../../../src/module/Error');
const command = require('../../../src/module/command/get');

test('An get command is defined', () => {
  expect(command).toBeDefined();
});

test('An get command includes base parameters', () => {
  expect(command._numberOfLinesToWait).toBe(1);
  expect(command._storage).toBeUndefined();
});

test('An get command executes a parser function', () => {
  expect(command.parser).toBeDefined();
});

test('An get command executes a run function', () => {
  expect(command.run).toBeDefined();
});

test('An get command executes a validate function', () => {
  expect(command.validate).toBeDefined();
});
