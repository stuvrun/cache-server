/* globals test expect */
const message = require('../../src/module/message');

test('A message is defined', () => {
  expect(message).toBeDefined();
});

test('A newLine label is defined in message', () => {
  expect(message.newLine).toBe('\r\n');
});

test('A portDescription label is defined in message', () => {
  expect(message.portDescription).toBe('port number where it will listen for TCP connections');
});

test('A reply label is defined in message', () => {
  expect(message.reply.deleted).toBe('DELETED\r\n');
  expect(message.reply.end).toBe('END\r\n');
  expect(message.reply.exists).toBe('EXISTS\r\n');
  expect(message.reply.newLine).toBe('\r\n');
  expect(message.reply.notFound).toBe('NOT_FOUND\r\n');
  expect(message.reply.notStored).toBe('NOT_STORED\r\n');
  expect(message.reply.stored).toBe('STORED\r\n');
  expect(message.reply.value).toBe('VALUE');
  expect(message.reply.workerStopped).toBe('Worker stopped with exit code');
});

test('A validation label is defined in message', () => {
  expect(message.validation.badCommandLineFormat).toBe('bad command line format');
  expect(message.validation.badDataChunk).toBe('bad data chunk\r\nERROR');
});
