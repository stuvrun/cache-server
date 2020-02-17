/* globals expect jest test */
const Request = require('../../../src/model/Request');
const Error = require('../../../src/module/Error');
const command = require('../../../src/module/command/add');

jest.mock('../../../src/module/command/abstract');

test('An add command is defined', () => {
  expect(command).toBeDefined();
  expect(command.parser).toBeDefined();
  expect(command.run).toBeDefined();
  expect(command.validate).toBeDefined();
});

test('An add command includes base parameters', () => {
  expect(command._numberOfLinesToWait).toBe(2);
  expect(command._storage).toBeDefined();
});

test('An add command executes a parser function', () => {
  expect(command.parser).toBeDefined();
  expect(command.parser).toBeInstanceOf(Function);

  let request = command.parser(['add', 'foo', '0', '120', '2', 'noreply']);
  expect(request).toBeInstanceOf(Request);
  expect(request.cmd).toBe('add');
  expect(request.params.length).toBe(1);
  expect(request.params[0].length).toBe(6);
  expect(request.lineCount).toBe(1);
  expect(request.waiting).toBe(true);
  expect(request.noreply).toBe(true);
  expect(request.error).toBe(undefined);

  request = command.parser(['ab\r\n'], request, 'ab\r\n');
  expect(request).toBeInstanceOf(Request);
  expect(request.cmd).toBe('add');
  expect(request.params.length).toBe(2);
  expect(request.params[0].length).toBe(6);
  expect(request.lineCount).toBe(2);
  expect(request.waiting).toBe(false);
  expect(request.noreply).toBe(true);
  expect(request.error).toBe(undefined);

  const request01 = command.parser(['add']);
  expect(request01.error).toBeInstanceOf(Error.Default);
});

test('An add command executes a run function', () => {
  expect(command.run).toBeDefined();
  expect(command.run).toBeInstanceOf(Function);

  let request00 = command.parser(['add', 'foo', '0', '120', '2']);
  request00 = command.parser(['ab'], request00, 'ab');
  expect(command.run(request00)).toBe('STORED\r\n');

  let request01 = command.parser(['add', 'f01', '0', '120', '2']);
  request01 = command.parser(['ab'], request01, 'ab');
  expect(command.run(request01)).toBe('NOT_STORED\r\n');

  let request02 = command.parser(['add', 'f02', '0', '120', '2']);
  request02 = command.parser(['ab'], request02, 'ab');
  expect(command.run(request02)).toBe('NOT_STORED\r\n');
});

test('An add command executes a validate function', () => {
  expect(command.validate).toBeDefined();
  expect(command.validate).toBeInstanceOf(Function);
  expect(command.validate([['add', 'foo', '0', '120', '2']], true)).toBeUndefined();
  expect(command.validate([['add', 'foo', '0', '120', '2', 'noreply']], true)).toBeUndefined();
  expect(command.validate([['add', 'foo', '0', '120', '2', 'noreply'], 'ab'], false)).toBeUndefined();
  expect(command.validate([['add', 'foo', '0', '120']], true)).toBeInstanceOf(Error.Default);
  expect(command.validate([['add', 'foo', 'A', '120', '2', 'noreply']], true)).toBeInstanceOf(Error.Client);
  expect(command.validate([['add', 'foo', '0', 'B', '2', 'noreply']], true)).toBeInstanceOf(Error.Client);
  expect(command.validate([['add', 'foo', '0', '120', 'C', 'noreply']], true)).toBeInstanceOf(Error.Client);
  expect(command.validate([['add', 'foo', '0', '120', '2', 'noreply'], 'abc'], false)).toBeInstanceOf(Error.Client);
});
