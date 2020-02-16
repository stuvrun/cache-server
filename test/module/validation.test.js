/* globals test expect */
const Error = require('../../src/module/Error');
const validation = require('../../src/module/validation');

test('A validation is defined', () => {
  expect(validation).toBeDefined();
});

test('checkBinaryLength in validation', () => {
  expect(validation.checkBinaryLength).toBeDefined();
  expect(validation.checkBinaryLength).toBeInstanceOf(Function);
  expect(validation.checkBinaryLength(false, 3, 'foo')).toBeUndefined();
  expect(validation.checkBinaryLength(true, 3, 'foo')).toBeUndefined();
  expect(validation.checkBinaryLength(false, 4, 'foo')).toBeInstanceOf(Error.Client);
  expect(validation.checkBinaryLength(false, 3, 'foobar')).toBeInstanceOf(Error.Client);
});

test('checkArrayLength in validation', () => {
  expect(validation.checkArrayLength).toBeDefined();
  expect(validation.checkArrayLength).toBeInstanceOf(Function);
  expect(validation.checkArrayLength([], 0, 1)).toBeUndefined();
  expect(validation.checkArrayLength(['foo'], 1, 1)).toBeUndefined();
  expect(validation.checkArrayLength(['foo'], 1, 2)).toBeUndefined();
  expect(validation.checkArrayLength(['foo'], 2, 2)).toBeInstanceOf(Error.Default);
  expect(validation.checkArrayLength(['foo'], 2, 3)).toBeInstanceOf(Error.Default);
});

test('checkNumericParams in validation', () => {
  expect(validation.checkNumericParams).toBeDefined();
  expect(validation.checkNumericParams).toBeInstanceOf(Function);
  expect(validation.checkNumericParams(['set', 'foo', '0', '120', '3', 'fo0'])).toBeUndefined();
  expect(validation.checkNumericParams(['add', 'foo', '0', '120', '3', 'fo1'])).toBeUndefined();
  expect(validation.checkNumericParams(['append', 'foo', '0', '120', '3', 'fo2'])).toBeUndefined();
  expect(validation.checkNumericParams(['cas', 'foo', '0', '120', '3', '1', 'fo2'])).toBeUndefined();
  expect(validation.checkNumericParams(['set', 'foo', 'A', '120', '3', 'fo0'])).toBeInstanceOf(Error.Client);
  expect(validation.checkNumericParams(['add', 'foo', '0', 'B', '3', 'fo1'])).toBeInstanceOf(Error.Client);
  expect(validation.checkNumericParams(['append', 'foo', '0', 'C', '3', 'fo2'])).toBeInstanceOf(Error.Client);
  expect(validation.checkNumericParams(['replace', 'foo', '0', '120', 'D', 'fo2'])).toBeInstanceOf(Error.Client);
  expect(validation.checkNumericParams(['cas', 'foo', '0', '120', '3', 'F', 'fo2'])).toBeInstanceOf(Error.Client);
});

test('checkNotReply in validation', () => {
  expect(validation.checkNotReply).toBeDefined();
  expect(validation.checkNotReply).toBeInstanceOf(Function);
  expect(validation.checkNotReply(['noreply'], 0)).toBeTruthy();
  expect(validation.checkNotReply(['foo', 'noreply'], 1)).toBeTruthy();
  expect(validation.checkNotReply(['foo'], 0)).toBeFalsy();
  expect(validation.checkNotReply(['noreply', 'foo'], 1)).toBeFalsy();
});
