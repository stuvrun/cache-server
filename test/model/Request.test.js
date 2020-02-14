/* globals test expect */
const Request = require('../../src/model/Request');

test('An request model is defined', () => {
  expect(Request).toBeDefined();
});

test('A request model can be instanced', () => {
  const instance = new Request();
  expect(instance).toBeDefined();
});

test('A request model can be parsed to string', () => {
  const instance = new Request();
  expect(instance.toString()).toBe('{"lineCount":0,"params":[],"waiting":false,"noreply":false,"quitConnection":false}');
});

test('A request model has a default cmd', () => {
  const instance = new Request();
  expect(instance.cmd).toBeUndefined();
});

test('A request model has a default lineCount', () => {
  const instance = new Request();
  expect(instance.lineCount).toEqual(0);
});

test('A request model has a default params', () => {
  const instance = new Request();
  expect(instance.params).toEqual([]);
});

test('A request model has a default waiting', () => {
  const instance = new Request();
  expect(instance.waiting).toEqual(false);
});

test('A request model has a default noreply', () => {
  const instance = new Request();
  expect(instance.noreply).toEqual(false);
});

test('A request model has a default quitConnection', () => {
  const instance = new Request();
  expect(instance.quitConnection).toEqual(false);
});

test('A request model has a default error', () => {
  const instance = new Request();
  expect(instance.error).toBeUndefined();
});
