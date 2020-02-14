/* globals test expect */
const data = require('../../global/data');
const abstract = require('../../../src/module/command/abstract');
const Record = require('../../../src/model/Record');

test('An abstract command is defined', () => {
  expect(abstract).toBeDefined();
});

test('An abstract command includes base parameters', () => {
  expect(abstract._numberOfLinesToWait).toBe(1);
  expect(abstract._storage).toBeUndefined();
});

test('An abstract command executes a createRecord function', () => {
  const dataTest = [['set', 'foo', '0', '120', '7'], 'foo bar'];
  const record = abstract.createRecord(dataTest);

  expect(record).toBeDefined();
  expect(record).toBeInstanceOf(Record);
  expect(record.flags).toBe(0);
  expect(record.exptime).toBe(120);
  expect(record.bytes).toBe(7);
  expect(record.data).toBe('foo bar');
});

test('An abstract command executes a parser function', () => {
  try {
    abstract.parser();
  } catch (error) {
    expect(error).toBeDefined();
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe(data.error.Base.messageFnNotDefined);
  }
});

test('An abstract command executes a run function', () => {
  try {
    abstract.run();
  } catch (error) {
    expect(error).toBeDefined();
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe(data.error.Base.messageFnNotDefined);
  }
});

test('An abstract command executes a validate function', () => {
  try {
    abstract.validate();
  } catch (error) {
    expect(error).toBeDefined();
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe(data.error.Base.messageFnNotDefined);
  }
});
