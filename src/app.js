const ArgumentParser = require('./module/ArgumentParser')
const Server = require('./module/Server')

/**
 * Class for init app runner.
 * @author braren <i@braren.co>
 * @copyright Copyright (c) 2020 Brayan Steven Rendón
 * @class
 */
class App {
  constructor () {
    const ARGUMENT_PARSER = new ArgumentParser()
    this.CONFIG = ARGUMENT_PARSER.getConfig()
  }

  run () {
    this.server = new Server(this.CONFIG)
  }
}

const app = new App()
app.run()

module.exports = app
