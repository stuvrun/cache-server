/* globals test expect */
const Record = require('../../src/model/Record');

test('An record model is defined', () => {
  expect(Record).toBeDefined();
});

test('A record model can be instanced', () => {
  const instance = new Record();
  expect(instance).toBeDefined();
});

test('A record model can be parsed to string', () => {
  const instance = new Record();
  expect(instance.toString()).toBe(`{"created":${Date.now()},"exptime":0}`);
});

test('A record model has a default unique id', () => {
  const instance = new Record();
  expect(instance.id).toBeUndefined();
});

test('A record model has a default flags', () => {
  const instance = new Record();
  expect(instance.flags).toBeUndefined();
});

test('A record model has a default bytes', () => {
  const instance = new Record();
  expect(instance.bytes).toBeUndefined();
});

test('A record model has a default data', () => {
  const instance = new Record();
  expect(instance.data).toBeUndefined();
});
