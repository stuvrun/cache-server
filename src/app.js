const ArgumentParser = require('./module/ArgumentParser');
const Server = require('./module/Server');

/**
 * Class for init app runner.
 * @class
 */
class App {
  constructor () {
    const argumentParser = new ArgumentParser();
    this.config = argumentParser.getConfig();
  }

  run () {
    this.server = new Server(this.config);
  }
}

const app = new App();
app.run();

module.exports = app;
