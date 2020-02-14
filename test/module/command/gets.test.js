/* globals test expect */
const data = require('../../global/data');
const Error = require('../../../src/module/Error');
const command = require('../../../src/module/command/gets');

test('An gets command is defined', () => {
  expect(command).toBeDefined();
});

test('An gets command includes base parameters', () => {
  expect(command._numberOfLinesToWait).toBe(1);
  expect(command._storage).toBeUndefined();
});

test('An gets command executes a parser function', () => {
  expect(command.parser).toBeDefined();
});

test('An gets command executes a run function', () => {
  expect(command.run).toBeDefined();
});

test('An gets command executes a validate function', () => {
  expect(command.validate).toBeDefined();
});
