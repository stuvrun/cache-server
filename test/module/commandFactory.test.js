/* globals test expect */
const commandFactory = require('../../src/module/commandFactory');

test('A commandFactory class is defined', () => {
  expect(commandFactory).toBeDefined();
});

test('A data storage has instanced at commandFactory', () => {
  expect(commandFactory._storage).toBeDefined();
});
