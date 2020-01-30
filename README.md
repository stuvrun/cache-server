# cache-server

Cache server that complies with the memcached specified protocol.

## Requirements

* [Node JS](https://nodejs.org/) v12.14.0 or higher
* [Yarn](https://yarnpkg.com/) v1.21.1 or higher
* [Visual Studio Code](https://code.visualstudio.com/)

## Installation

Use the package manager [Yarn](https://yarnpkg.com/) to install the dependencies.

```bash
~$ yarn install
```

### Build Docker image

```bash
~$ docker build -f ./Dockerfile . --no-cache -t braren/cache-server:1.0.0
```

## Usage

### Run

```bash
~$ yarn start
```

### Run Docker image

```bash
~$ docker run --name mycache -p 11211:11211 -d braren/cache-server:1.0.0
```

### Test - Jest

```bash
~$ yarn test
```

### Test - JMeter

```bash
~$ # open file with jmeter
~$ ./jmeter_test_plan.jmx
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

Copyright (c) 2020 Brayan Steven Rendón
