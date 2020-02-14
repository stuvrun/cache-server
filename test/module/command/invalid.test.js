/* globals test expect */
const data = require('../../global/data');
const Error = require('../../../src/module/Error');
const invalid = require('../../../src/module/command/invalid');

test('An invalid command is defined', () => {
  expect(invalid).toBeDefined();
});

test('An invalid command includes base parameters', () => {
  expect(invalid._numberOfLinesToWait).toBe(1);
  expect(invalid._storage).toBeUndefined();
});

test('An invalid command executes a parser function', () => {
  const request = invalid.parser();

  expect(request).toBeDefined();
  expect(request.error).toBeDefined();
  expect(request.error).toBeInstanceOf(Error.Default);
  expect(request.error.name).toBe(data.error.Default.name);
  expect(request.error.message).toBe(data.error.Default.message);
});

test('An invalid command executes a run function', () => {
  try {
    invalid.run();
  } catch (error) {
    expect(error).toBeDefined();
    expect(error).toBeInstanceOf(Error.Base);
    expect(error.message).toBe(data.error.Base.messageFnNotDefined);
  }
});

test('An invalid command executes a validate function', () => {
  try {
    invalid.validate();
  } catch (error) {
    expect(error).toBeDefined();
    expect(error).toBeInstanceOf(Error.Base);
    expect(error.message).toBe(data.error.Base.messageFnNotDefined);
  }
});
