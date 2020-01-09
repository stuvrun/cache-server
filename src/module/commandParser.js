/**
 * Function for commands parser.
 * @author braren <i@braren.co>
 * @copyright Copyright (c) 2020 Brayan Steven Rendón
 * @param {string} data to be parsed.
 * @param {Array} elementsPrev to be merge with new elements.
 * @function
 */
function commandParser (data = '', elementsPrev = []) {
  const elements = data.replace('\r\n', ' ').trim().split(' ')
  return [...elementsPrev, ...elements]
}

module.exports = commandParser
