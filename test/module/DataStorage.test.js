/* globals test expect */
const DataStorage = require('../../src/module/DataStorage');

test('A data storage is defined', () => {
  expect(DataStorage).toBeDefined();
});

test('A data storage can be instanced', () => {
  const instance = new DataStorage();
  expect(instance).toBeDefined();
});

test('A data storage has a object model', () => {
  const instance = new DataStorage();
  expect(instance.table).toBeDefined();
});

test('A data storage can be stored', () => {
  const instance = new DataStorage();
  instance.set('bar', 'foo');
  expect(instance.get('bar')).toBe('foo');
});

test('A data storage can be obtained', () => {
  const instance = new DataStorage();
  instance.set('bar', 'foo');
  expect(instance.get('bar')).toBe('foo');
});

test('A data storage can be deleted', () => {
  const instance = new DataStorage();
  instance.set('bar', 'foo');
  expect(instance.delete('bar')).toBeTruthy();
});
