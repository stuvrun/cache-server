/* globals test expect */
const data = require('../../global/data');
const Error = require('../../../src/module/Error');
const command = require('../../../src/module/command/prepend');

test('An prepend command is defined', () => {
  expect(command).toBeDefined();
});

test('An prepend command includes base parameters', () => {
  expect(command._numberOfLinesToWait).toBe(2);
  expect(command._storage).toBeUndefined();
});

test('An prepend command executes a parser function', () => {
  expect(command.parser).toBeDefined();
});

test('An prepend command executes a run function', () => {
  expect(command.run).toBeDefined();
});

test('An prepend command executes a validate function', () => {
  expect(command.validate).toBeDefined();
});
