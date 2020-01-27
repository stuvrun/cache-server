/* globals test expect */
const message = require('../../src/module/message')

test('A message is defined', () => {
  expect(message).toBeDefined()
})

test('An answer message can be instanced', () => {
  const instance = new message.Response()
  expect(instance).toBeDefined()
})

test('An answer message has a default value', () => {
  const instance = new message.Response()
  expect(instance.toString()).toBe('')
})

test('An answer message could be append', () => {
  const instance = new message.Response()
  instance.append('foo')
  expect(instance.toString()).toBe('foo')
})

test('An answer message could be append with "foo & bar"', () => {
  const instance = new message.Response()
  instance.append('foo')
  instance.append(' ')
  instance.append('&')
  instance.append(' ')
  instance.append('bar')
  expect(instance.toString()).toBe('foo & bar')
})

test('A client error message can be instanced', () => {
  const instance = message.CustomError.client()
  expect(instance).toBeDefined()
})

test('A default error message can be instanced', () => {
  const instance = message.CustomError.default()
  expect(instance).toBeDefined()
})

test('A server error message can be instanced', () => {
  const instance = message.CustomError.server()
  expect(instance).toBeDefined()
})
