/* globals test expect */
const DataStorage = require('../../src/module/DataStorage');
const request = {
  data: 'foo'
};

test('A data storage is defined', () => {
  expect(DataStorage).toBeDefined();
});

test('A data storage can be instanced', () => {
  const instance = new DataStorage();
  expect(instance).toBeDefined();
});

test('A data storage has a object model', () => {
  const instance = new DataStorage();
  expect(instance._table).toBeDefined();
});

test('A data storage has a _counter', () => {
  const instance = new DataStorage();
  expect(instance._counter).toBeDefined();
});

test('A data storage can be stored', () => {
  const instance = new DataStorage();
  instance.set('bar', request);
  expect(instance.get('bar')).toBeDefined();
  expect(instance.get('bar').data).toBe('foo');
});

test('A data storage can be obtained', () => {
  const instance = new DataStorage();
  instance.set('bar', request);
  expect(instance.get('bar')).toBeDefined();
  expect(instance.get('bar').data).toBe('foo');
});

test('A data storage can be deleted', () => {
  const instance = new DataStorage();
  instance.set('bar', request);
  expect(instance.delete('bar')).toBeTruthy();
});
