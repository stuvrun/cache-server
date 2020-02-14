/* globals test expect */
const paramsParser = require('../../src/module/paramsParser');

test('A params parser is defined', () => {
  expect(paramsParser).toBeDefined();
});

test('A params parser can be instanced', () => {
  expect(paramsParser()).toBeDefined();
});

test('A params parser has a default value', () => {
  expect(paramsParser()).toStrictEqual(['']);
});

test('A params parser could be "get 0 0 0\r\n"', () => {
  expect(paramsParser('get 0 0 0\r\n')).toStrictEqual(['get', '0', '0', '0']);
});

test('A params parser could be "set 0 0 0\r\nfoo\r\n"', () => {
  expect(paramsParser('set 0 0 0\r\nfoo\r\n')).toStrictEqual(['set', '0', '0', '0', 'foo']);
});

test('A params parser could be "foo bar get 0 0 0\r\n" merged', () => {
  expect(paramsParser('get 0 0 0\r\n', ['foo', 'bar'])).toStrictEqual(['foo', 'bar', 'get', '0', '0', '0']);
});
