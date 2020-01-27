const DataStorage = require('./DataStorage')
const checker = require('./checker')
const { Response } = require('./message')
const Record = require('../model/Record')

/**
 * Class singleton for commands.
 * @author braren <i@braren.co>
 * @copyright Copyright (c) 2020 Brayan Steven Rendón
 * @class
 */
const command = {
  _forWait: ['set', 'add', 'replace', 'append', 'prepend'],
  _storage: new DataStorage(),
  // get gets
  get: (client, args = []) => {
    const key = args[1]
    const element = command._storage.get(key)

    const response = new Response()
    response.append(`VALUE ${key} ${element.flags} ${element.bytes}\r\n`)
    response.append(element.data + '\r\n')
    response.append('END\r\n')
    command.write(client, response)
  },
  quit: (client) => {
    client.end()
  },
  // set add replace append prepend cas
  set: (client, args = []) => {
    const key = args[1]
    const record = command.createRecord(args)

    command._storage.set(key, record)

    const response = new Response()
    response.append('STORED\r\n')
    command.write(client, response)
  },
  // generic
  createRecord: (args, isCAS = false) => {
    const record = new Record()
    record.flags = Number(args[2])
    record.bytes = Number(args[4])
    record.casUnique = isCAS ? Number(args[5]) : undefined
    record.data = args[args.length - 1]

    checker.dataBinary(record)

    return record
  },
  write: (client, response, noreply = false) => {
    if (noreply === false) {
      client.write(response.toString())
    }
  }
}

module.exports = command
