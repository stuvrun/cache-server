const ArgumentParser = require('./module/ArgumentParser')

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
    console.log('Starting...')
    console.log(this.CONFIG.toString())
    console.log('Started')
  }
}

const app = new App()
app.run()

module.exports = app
