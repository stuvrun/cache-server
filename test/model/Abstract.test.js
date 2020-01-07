/* globals test expect */
const Abstract = require('../../src/model/Abstract')

test('An abstract model is defined', () => {
  expect(Abstract).toBeDefined()
})

test('An abstract model can be instanced', () => {
  const instance = new Abstract()
  expect(instance).toBeDefined()
})

test('An abstract model can be parsed to string', () => {
  const instance = new Abstract()
  expect(instance.toString()).toBe('{}')
})
