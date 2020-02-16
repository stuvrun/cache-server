/* globals test expect */
const commandFactory = require('../../src/module/commandFactory');

const DataStorage = require('../../src/module/DataStorage');
const add = require('../../src/module/command/add');
const append = require('../../src/module/command/append');
const cas = require('../../src/module/command/cas');
const deleteCmd = require('../../src/module/command/delete');
const get = require('../../src/module/command/get');
const gets = require('../../src/module/command/gets');
const prepend = require('../../src/module/command/prepend');
const quit = require('../../src/module/command/quit');
const replace = require('../../src/module/command/replace');
const set = require('../../src/module/command/set');
const invalid = require('../../src/module/command/invalid');

test('A commandFactory class is defined', () => {
  expect(commandFactory).toBeDefined();
});

test('A data storage has instanced at commandFactory', () => {
  expect(commandFactory._storage).toBeDefined();
  expect(commandFactory._storage).toBeInstanceOf(DataStorage);
});

test('The getByKey function can be obtained from the factory', () => {
  expect(commandFactory.getByKey).toBeDefined();
  expect(commandFactory.getByKey).toBeInstanceOf(Function);
});

test('The add command can be obtained from the factory', () => {
  const command = commandFactory.getByKey('add');
  expect(command).toBeDefined();
  expect(command).toBe(add);
});

test('The append command can be obtained from the factory', () => {
  const command = commandFactory.getByKey('append');
  expect(command).toBeDefined();
  expect(command).toBe(append);
});

test('The cas command can be obtained from the factory', () => {
  const command = commandFactory.getByKey('cas');
  expect(command).toBeDefined();
  expect(command).toBe(cas);
});

test('The deleteCmd command can be obtained from the factory', () => {
  const command = commandFactory.getByKey('delete');
  expect(command).toBeDefined();
  expect(command).toBe(deleteCmd);
});

test('The get command can be obtained from the factory', () => {
  const command = commandFactory.getByKey('get');
  expect(command).toBeDefined();
  expect(command).toBe(get);
});

test('The gets command can be obtained from the factory', () => {
  const command = commandFactory.getByKey('gets');
  expect(command).toBeDefined();
  expect(command).toBe(gets);
});

test('The prepend command can be obtained from the factory', () => {
  const command = commandFactory.getByKey('prepend');
  expect(command).toBeDefined();
  expect(command).toBe(prepend);
});

test('The quit command can be obtained from the factory', () => {
  const command = commandFactory.getByKey('quit');
  expect(command).toBeDefined();
  expect(command).toBe(quit);
});

test('The replace command can be obtained from the factory', () => {
  const command = commandFactory.getByKey('replace');
  expect(command).toBeDefined();
  expect(command).toBe(replace);
});

test('The set command can be obtained from the factory', () => {
  const command = commandFactory.getByKey('set');
  expect(command).toBeDefined();
  expect(command).toBe(set);
});

test('The invalid command can be obtained from the factory', () => {
  const command = commandFactory.getByKey('invalid');
  expect(command).toBeDefined();
  expect(command).toBe(invalid);
});

test('An invalid command can be obtained from the factory', () => {
  const command = commandFactory.getByKey('foo');
  expect(command).toBeDefined();
  expect(command).toBe(invalid);
});
