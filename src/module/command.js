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
  _counter: 1,
  _forWait: ['set', 'add', 'replace', 'append', 'prepend'],
  _storage: new DataStorage(),
  // get gets
  get: (client, args = [], withCAS = false) => {
    const response = new Response()

    args.slice(1, args.length).forEach(key => {
      const element = command._storage.get(key)

      if (element) {
        const CAS_COMPLEMENT = withCAS ? ' ' + element.id : ''

        response.append(`VALUE ${key} ${element.flags} ${element.bytes + CAS_COMPLEMENT}\r\n`)
        response.append(element.data + '\r\n')
      }
    })

    response.append('END\r\n')
    command.write(client, response)
  },
  gets: (client, args = []) => {
    command.get(client, args, true)
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
    record.id = command._counter
    record.flags = Number(args[2])
    record.bytes = Number(args[4])
    record.casUnique = isCAS ? Number(args[5]) : undefined
    record.data = args[args.length - 1]

    checker.dataBinary(record)
    command._counter++

    return record
  },
  write: (client, response, noreply = false) => {
    if (noreply === false) {
      client.write(response.toString())
    }
  }
}

module.exports = command
