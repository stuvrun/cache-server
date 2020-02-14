/* globals test expect */
const data = require('../../global/data');
const Error = require('../../../src/module/Error');
const command = require('../../../src/module/command/cas');

test('An cas command is defined', () => {
  expect(command).toBeDefined();
});

test('An cas command includes base parameters', () => {
  expect(command._numberOfLinesToWait).toBe(2);
  expect(command._storage).toBeUndefined();
});

test('An cas command executes a parser function', () => {
  expect(command.parser).toBeDefined();
});

test('An cas command executes a run function', () => {
  expect(command.run).toBeDefined();
});

test('An cas command executes a validate function', () => {
  expect(command.validate).toBeDefined();
});
