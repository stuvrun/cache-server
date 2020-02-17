/* globals expect jest test */
const Request = require('../../../src/model/Request');
const Error = require('../../../src/module/Error');
const command = require('../../../src/module/command/cas');

jest.mock('../../../src/module/command/abstract');

test('An cas command is defined', () => {
  expect(command).toBeDefined();
  expect(command.parser).toBeDefined();
  expect(command.run).toBeDefined();
  expect(command.validate).toBeDefined();
});

test('An cas command includes base parameters', () => {
  expect(command._numberOfLinesToWait).toBe(2);
  expect(command._storage).toBeDefined();
});

test('An cas command executes a parser function', () => {
  expect(command.parser).toBeDefined();
  expect(command.parser).toBeInstanceOf(Function);

  let request = command.parser(['cas', 'foo', '0', '120', '2', '1', 'noreply']);
  expect(request).toBeInstanceOf(Request);
  expect(request.cmd).toBe('cas');
  expect(request.params.length).toBe(1);
  expect(request.params[0].length).toBe(7);
  expect(request.lineCount).toBe(1);
  expect(request.waiting).toBe(true);
  expect(request.noreply).toBe(true);
  expect(request.error).toBe(undefined);

  request = command.parser(['ab\r\n'], request, 'ab\r\n');
  expect(request).toBeInstanceOf(Request);
  expect(request.cmd).toBe('cas');
  expect(request.params.length).toBe(2);
  expect(request.params[0].length).toBe(7);
  expect(request.lineCount).toBe(2);
  expect(request.waiting).toBe(false);
  expect(request.noreply).toBe(true);
  expect(request.error).toBe(undefined);

  const request01 = command.parser(['cas']);
  expect(request01.error).toBeInstanceOf(Error.Default);
});

test('An cas command executes a run function', () => {
  expect(command.run).toBeDefined();
  expect(command.run).toBeInstanceOf(Function);

  let request00 = command.parser(['cas', 'foo', '0', '120', '2', '1']);
  request00 = command.parser(['ab'], request00, 'ab');
  expect(command.run(request00)).toBe('NOT_FOUND\r\n');

  let request01 = command.parser(['cas', 'f01', '0', '120', '2', '0']);
  request01 = command.parser(['ab'], request01, 'ab');
  expect(command.run(request01)).toBe('EXISTS\r\n');

  let request02 = command.parser(['cas', 'f01', '0', '120', '2', '1']);
  request02 = command.parser(['ab'], request02, 'ab');
  expect(command.run(request02)).toBe('STORED\r\n');

  let request03 = command.parser(['cas', 'f02', '0', '120', '2', '0', '2']);
  request03 = command.parser(['ab'], request03, 'ab');
  expect(command.run(request03)).toBe('EXISTS\r\n');
});

test('An cas command executes a validate function', () => {
  expect(command.validate).toBeDefined();
  expect(command.validate).toBeInstanceOf(Function);
  expect(command.validate([['cas', 'foo', '0', '120', '2', '1']], true)).toBeUndefined();
  expect(command.validate([['cas', 'foo', '0', '120', '2', '1', 'noreply']], true)).toBeUndefined();
  expect(command.validate([['cas', 'foo', '0', '120', '2', '1', 'noreply'], 'ab'], false)).toBeUndefined();
  expect(command.validate([['cas', 'foo', '0', '120', '2']], true)).toBeInstanceOf(Error.Default);
  expect(command.validate([['cas', 'foo', 'A', '120', '2', '1', 'noreply']], true)).toBeInstanceOf(Error.Client);
  expect(command.validate([['cas', 'foo', '0', 'B', '2', '1', 'noreply']], true)).toBeInstanceOf(Error.Client);
  expect(command.validate([['cas', 'foo', '0', '120', 'C', '1', 'noreply']], true)).toBeInstanceOf(Error.Client);
  expect(command.validate([['cas', 'foo', '0', '120', '2', 'D', 'noreply']], true)).toBeInstanceOf(Error.Client);
  expect(command.validate([['cas', 'foo', '0', '120', '2', '1', 'noreply'], 'abc'], false)).toBeInstanceOf(Error.Client);
});
