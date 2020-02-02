/* globals test expect */
const commandParser = require('../../src/module/commandParser');

test('A command parser is defined', () => {
  expect(commandParser).toBeDefined();
});

test('A command parser can be instanced', () => {
  expect(commandParser()).toBeDefined();
});

test('A command parser has a default value', () => {
  expect(commandParser()).toStrictEqual(['']);
});

test('A command parser could be "get 0 0 0\r\n"', () => {
  expect(commandParser('get 0 0 0\r\n')).toStrictEqual(['get', '0', '0', '0']);
});

test('A command parser could be "set 0 0 0\r\nfoo\r\n"', () => {
  expect(commandParser('set 0 0 0\r\nfoo\r\n')).toStrictEqual(['set', '0', '0', '0', 'foo']);
});
