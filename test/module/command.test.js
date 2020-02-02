/* globals test expect */
const command = require('../../src/module/command');

test('A command class is defined', () => {
  expect(command).toBeDefined();
});

test('A data storage has instanced at command', () => {
  expect(command._storage).toBeDefined();
});

test('An array funtions has included at command', () => {
  expect(command._forWait).toStrictEqual(['set', 'add', 'replace', 'append', 'prepend']);
});
