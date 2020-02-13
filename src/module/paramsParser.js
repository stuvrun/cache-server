/**
 * Function for commands parser.
 * @function
 */
function paramsParser (data = '', elementsPrev = []) {
  const elements = data.replace('\r\n', ' ').trim().split(' ');
  return [...elementsPrev, ...elements];
}

module.exports = paramsParser;
