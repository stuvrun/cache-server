/* globals test expect */
const data = require('../../global/data');
const Request = require('../../../src/model/Request');
const Error = require('../../../src/module/Error');
const quit = require('../../../src/module/command/quit');

test('An quit command is defined', () => {
  expect(quit).toBeDefined();
});

test('An quit command includes base parameters', () => {
  expect(quit._numberOfLinesToWait).toBe(1);
  expect(quit._storage).toBeUndefined();
});

test('An quit command executes a parser function', () => {
  const request = quit.parser(data.command.quit.request.params.example01);

  expect(request).toBeDefined();
  expect(request).toBeInstanceOf(Request);
  expect(request.cmd).toBe(data.command.quit.request.cmd);
  expect(request.params[0]).toBe(data.command.quit.request.params.example01);
  expect(request.lineCount).toBe(data.command.quit.request.lineCount);
  expect(request.waiting).toBe(data.command.quit.request.waiting);
  expect(request.noreply).toBe(data.command.quit.request.noreply);
  expect(request.quitConnection).toBe(data.command.quit.request.quitConnection);
  expect(request.error).toBe(data.command.quit.request.error);
});

test('An quit command executes a parser function with params error', () => {
  const request = quit.parser(data.command.quit.request.params.example02);

  expect(request).toBeDefined();
  expect(request).toBeInstanceOf(Request);
  expect(request.cmd).toBe(data.command.quit.request.cmd);
  expect(request.params[0]).toBe(data.command.quit.request.params.example02);
  expect(request.lineCount).toBe(data.command.quit.request.lineCount);
  expect(request.waiting).toBe(data.command.quit.request.waiting);
  expect(request.noreply).toBe(data.command.quit.request.noreply);
  expect(request.quitConnection).toBe(data.command.quit.request.quitConnection);
  expect(request.error.message).toBe(data.error.Default.message);
});

test('An quit command executes a run function', () => {
  const response = quit.run();
  expect(response).toBeDefined();
  expect(response).toBe(data.command.quit.response);
});

test('An quit command executes a validate function', () => {
  try {
    quit.validate();
  } catch (error) {
    expect(error).toBeDefined();
    expect(error).toBeInstanceOf(Error.Base);
    expect(error.message).toBe(data.Base.messageFnNotDefined);
  }
});
