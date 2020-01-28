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
  _forWait: ['set', 'add', 'replace', 'append', 'prepend', 'cas'],
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
    const noreply = checker.toReply(args, 5)
    const record = command.createRecord(args)

    command._storage.set(key, record)

    const response = new Response()
    response.append('STORED\r\n')
    command.write(client, response, noreply)
  },
  add: (client, args = []) => {
    const key = args[1]
    const noreply = checker.toReply(args, 5)
    const element = command._storage.get(key)

    if (element) {
      const response = new Response()
      response.append('NOT_STORED\r\n')
      command.write(client, response, noreply)
    } else {
      command.set(client, args)
    }
  },
  replace: (client, args = []) => {
    const key = args[1]
    const noreply = checker.toReply(args, 5)
    const element = command._storage.get(key)

    if (element) {
      command.set(client, args)
    } else {
      const response = new Response()
      response.append('NOT_STORED\r\n')
      command.write(client, response, noreply)
    }
  },
  append: (client, args = []) => {
    const key = args[1]
    const noreply = checker.toReply(args, 5)
    const element = command._storage.get(key)

    if (element) {
      args[4] = element.bytes + command.createRecord(args).bytes
      args[args.length - 1] = element.data + args[args.length - 1]
      command.set(client, args)
    } else {
      const response = new Response()
      response.append('NOT_STORED\r\n')
      command.write(client, response, noreply)
    }
  },
  prepend: (client, args = []) => {
    const key = args[1]
    const noreply = checker.toReply(args, 5)
    const element = command._storage.get(key)

    if (element) {
      args[4] = element.bytes + command.createRecord(args).bytes
      args[args.length - 1] = args[args.length - 1] + element.data
      command.set(client, args)
    } else {
      const response = new Response()
      response.append('NOT_STORED\r\n')
      command.write(client, response, noreply)
    }
  },
  cas: (client, args = []) => {
    const key = args[1]
    const noreply = checker.toReply(args, 6)
    const idCAS = Number(args[5])
    const element = command._storage.get(key)

    if (element) {
      if (element.id === idCAS) {
        command.set(client, args)
      } else {
        const response = new Response()
        response.append('EXISTS\r\n')
        command.write(client, response, noreply)
      }
    } else {
      const response = new Response()
      response.append('NOT_FOUND\r\n')
      command.write(client, response, noreply)
    }
  },
  // generic
  createRecord: (args) => {
    const record = new Record()
    record.id = command._counter
    record.flags = Number(args[2])
    record.bytes = Number(args[4])
    record.data = args[args.length - 1]

    record.bytes = checker.dataBinary(record)
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