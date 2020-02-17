/* globals expect jest test */
const Request = require('../../../src/model/Request');
const Error = require('../../../src/module/Error');
const command = require('../../../src/module/command/delete');

jest.mock('../../../src/module/command/abstract');

test('An delete command is defined', () => {
  expect(command).toBeDefined();
  expect(command.parser).toBeDefined();
  expect(command.run).toBeDefined();
  expect(command.validate).toBeDefined();
});

test('An delete command includes base parameters', () => {
  expect(command._numberOfLinesToWait).toBe(1);
  expect(command._storage).toBeDefined();
});

test('An delete command executes a parser function', () => {
  expect(command.parser).toBeDefined();
  expect(command.parser).toBeInstanceOf(Function);

  const request = command.parser(['delete', 'foo']);
  expect(request).toBeInstanceOf(Request);
  expect(request.cmd).toBe('delete');
  expect(request.params.length).toBe(1);
  expect(request.params[0].length).toBe(2);
  expect(request.lineCount).toBe(1);
  expect(request.waiting).toBe(false);
  expect(request.noreply).toBe(false);
  expect(request.error).toBe(undefined);

  const request01 = command.parser(['delete']);
  expect(request01.error).toBeInstanceOf(Error.Default);
});

test('An delete command executes a run function', () => {
  expect(command.run).toBeDefined();
  expect(command.run).toBeInstanceOf(Function);

  const request00 = command.parser(['delete', 'foo']);
  expect(command.run(request00)).toBe('NOT_FOUND\r\n');

  const request01 = command.parser(['delete', 'f01']);
  expect(command.run(request01)).toBe('DELETED\r\n');

  const request02 = command.parser(['delete', 'f02', 'noreply']);
  expect(command.run(request02)).toBe('DELETED\r\n');
});

test('An delete command executes a validate function', () => {
  expect(command.validate).toBeDefined();
  expect(command.validate).toBeInstanceOf(Function);
  expect(command.validate(['delete', 'foo'])).toBeUndefined();
  expect(command.validate(['delete', 'foo', 'noreply'])).toBeUndefined();
  expect(command.validate(['delete'])).toBeInstanceOf(Error.Default);
});
