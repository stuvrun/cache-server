/* globals expect jest test */
const Request = require('../../../src/model/Request');
const Error = require('../../../src/module/Error');
const command = require('../../../src/module/command/gets');

jest.mock('../../../src/module/command/abstract');

test('An gets command is defined', () => {
  expect(command).toBeDefined();
  expect(command.parser).toBeDefined();
  expect(command.run).toBeDefined();
  expect(command.validate).toBeDefined();
});

test('An gets command includes base parameters', () => {
  expect(command._numberOfLinesToWait).toBe(1);
  expect(command._storage).toBeDefined();
});

test('An gets command executes a parser function', () => {
  expect(command.parser).toBeDefined();
  expect(command.parser).toBeInstanceOf(Function);

  const request = command.parser(['gets', 'foo']);
  expect(request).toBeInstanceOf(Request);
  expect(request.cmd).toBe('gets');
  expect(request.params.length).toBe(1);
  expect(request.params[0].length).toBe(2);
  expect(request.lineCount).toBe(1);
  expect(request.waiting).toBe(false);
  expect(request.noreply).toBe(false);
  expect(request.error).toBe(undefined);

  const request01 = command.parser(['gets']);
  expect(request01.error).toBeInstanceOf(Error.Default);
});

test('An gets command executes a run function', () => {
  expect(command.run).toBeDefined();
  expect(command.run).toBeInstanceOf(Function);

  const request00 = command.parser(['gets', 'foo']);
  expect(command.run(request00)).toBe('END\r\n');

  const request01 = command.parser(['gets', 'f01']);
  expect(command.run(request01)).toBe('VALUE f01 1 3 1\r\nf01\r\nEND\r\n');

  const request02 = command.parser(['gets', 'f01', 'f02']);
  expect(command.run(request02)).toBe('VALUE f01 1 3 1\r\nf01\r\nVALUE f02 1 3 2\r\nf02\r\nEND\r\n');
});

test('An gets command executes a validate function', () => {
  expect(command.validate).toBeDefined();
  expect(command.validate).toBeInstanceOf(Function);
  expect(command.validate(['gets', 'foo'])).toBeUndefined();
  expect(command.validate(['gets', 'foo', 'bar'])).toBeUndefined();
  expect(command.validate(['gets'])).toBeInstanceOf(Error.Default);
});
