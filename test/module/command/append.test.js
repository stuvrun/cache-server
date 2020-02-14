/* globals test expect */
const data = require('../../global/data');
const Error = require('../../../src/module/Error');
const command = require('../../../src/module/command/append');

test('An append command is defined', () => {
  expect(command).toBeDefined();
});

test('An append command includes base parameters', () => {
  expect(command._numberOfLinesToWait).toBe(2);
  expect(command._storage).toBeUndefined();
});

test('An append command executes a parser function', () => {
  expect(command.parser).toBeDefined();
});

test('An append command executes a run function', () => {
  expect(command.run).toBeDefined();
});

test('An append command executes a validate function', () => {
  expect(command.validate).toBeDefined();
});