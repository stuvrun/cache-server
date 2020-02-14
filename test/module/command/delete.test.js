/* globals test expect */
const data = require('../../global/data');
const Error = require('../../../src/module/Error');
const command = require('../../../src/module/command/delete');

test('An delete command is defined', () => {
  expect(command).toBeDefined();
});

test('An delete command includes base parameters', () => {
  expect(command._numberOfLinesToWait).toBe(1);
  expect(command._storage).toBeUndefined();
});

test('An delete command executes a parser function', () => {
  expect(command.parser).toBeDefined();
});

test('An delete command executes a run function', () => {
  expect(command.run).toBeDefined();
});

test('An delete command executes a validate function', () => {
  expect(command.validate).toBeDefined();
});
