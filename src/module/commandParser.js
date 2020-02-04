/**
 * Function for commands parser.
 * @function
 */
function commandParser (data = '', elementsPrev = []) {
  const elements = data.replace('\r\n', ' ').trim().split(' ');
  return [...elementsPrev, ...elements];
}

module.exports = commandParser;
