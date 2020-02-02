/* globals test expect */
const Response = require('../../src/module/Response');

test('A message is defined', () => {
  expect(Response).toBeDefined();
});

test('An answer message can be instanced', () => {
  const instance = new Response();
  expect(instance).toBeDefined();
});

test('An answer message has a default value', () => {
  const instance = new Response();
  expect(instance.toString()).toBe('');
});

test('An answer message could be append', () => {
  const instance = new Response();
  instance.append('foo');
  expect(instance.toString()).toBe('foo');
});

test('An answer message could be append with "foo & bar"', () => {
  const instance = new Response();
  instance.append('foo');
  instance.append(' ');
  instance.append('&');
  instance.append(' ');
  instance.append('bar');
  expect(instance.toString()).toBe('foo & bar');
});
