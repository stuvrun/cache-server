/* globals test expect */
const Server = require('../../src/module/Server');

test('A server is defined', () => {
  expect(Server).toBeDefined();
});

test('A data storage is defined', () => {
  expect(Server.prototype.commandService).toBeDefined();
  expect(Server.prototype.errorService).toBeDefined();
  expect(Server.prototype.keepRequest).toBeDefined();
  expect(Server.prototype.listener).toBeDefined();
  expect(Server.prototype.sendResponse).toBeDefined();
});
