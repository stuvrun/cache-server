/* globals test expect */
const ArgumentParser = require('../../src/module/ArgumentParser')

test('An argument parser is defined', () => {
  expect(ArgumentParser).toBeDefined()
})

test('An argument parser can be instanced', () => {
  const instance = new ArgumentParser()
  expect(instance).toBeDefined()
})

test('An argument parser has a config model', () => {
  const instance = new ArgumentParser()
  const config = instance.getConfig()
  expect(config).toBeDefined()
})

test('A config model has a default port', () => {
  const instance = new ArgumentParser()
  const config = instance.getConfig()
  expect(config.port).toBe(11211)
})
