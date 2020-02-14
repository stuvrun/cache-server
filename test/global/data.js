const data = {
  command: {
    quit: {
      request: {
        cmd: 'quit',
        params: {
          example01: ['quit'],
          example02: ['quit', 'foo']
        },
        lineCount: 1,
        waiting: false,
        noreply: false,
        quitConnection: true,
        error: undefined
      },
      response: 'quitted'
    }
  },
  error: {
    Base: {
      messageFnNotDefined: 'you need to define this function'
    },
    Client: {
      name: 'ClientError',
      message: 'CLIENT_ERROR '
    },
    Default: {
      name: 'DefaultError',
      message: 'ERROR\r\n'
    },
    Server: {
      name: 'ServerError',
      message: 'SERVER_ERROR '
    }
  },
  newLine: '\r\n'
};

module.exports = data;
