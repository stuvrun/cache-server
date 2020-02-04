/**
 * Class singleton for common messages.
 * @class
 */
const newLine = '\r\n';

module.exports = Object.freeze({
  portDescription: 'port number where it will listen for TCP connections',
  reply: {
    deleted: `DELETED${newLine}`,
    end: `END${newLine}`,
    exists: `EXISTS${newLine}`,
    newLine,
    notFound: `NOT_FOUND${newLine}`,
    notStored: `NOT_STORED${newLine}`,
    stored: `STORED${newLine}`,
    value: 'VALUE',
    workerStopped: 'Worker stopped with exit code'
  },
  validation: {
    badCommandLineFormat: 'bad command line format',
    badDataChunk: `bad data chunk${newLine}ERROR`
  }
});
