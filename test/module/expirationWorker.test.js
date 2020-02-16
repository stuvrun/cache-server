/* globals test expect */
const expirationWorker = require('../../src/module/expirationWorker');

test('A expirationWorker is defined', () => {
  expect(expirationWorker).toBeDefined();
});

test('A expirationWorker can be obtained from the factory', () => {
  const instance = expirationWorker();

  expect(instance).toBeDefined();
  expect(instance).toBeInstanceOf(Promise);
});
