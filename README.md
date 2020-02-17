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
~$ docker build -f ./Dockerfile . --no-cache -t braren/cache-server:1.0.1
```

## Usage

### Run

```bash
~$ yarn start
```

### Run Docker image

```bash
~$ docker run --name mycache -p 11211:11211 -d braren/cache-server:1.0.1
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

## Examples

### Retrieval commands

#### input

```bash
get <key>*\r\n #* means one or more key strings separated by whitespace.
gets <key>*\r\n #* means one or more key strings separated by whitespace.
```

#### output

```bash
VALUE <key> <flags> <bytes> [<cas unique>]\r\n
<data block>\r\n
END
```

### Storage commands

#### input

```bash
set <key> <flags> <exptime> <bytes> [noreply]\r\n
add <key> <flags> <exptime> <bytes> [noreply]\r\n
replace <key> <flags> <exptime> <bytes> [noreply]\r\n
append <key> <flags> <exptime> <bytes> [noreply]\r\n
prepend <key> <flags> <exptime> <bytes> [noreply]\r\n
cas <key> <flags> <exptime> <bytes> <cas unique> [noreply]\r\n
```

#### output

```bash
STORED\r\n #to indicate success.
NOT_STORED\r\n #to indicate the data was not stored, but not because of an error. This normally means that the condition for an "add" or a "replace" command wasn't met.
EXISTS\r\n #to indicate that the item you are trying to store with a "cas" command has been modified since you last fetched it.
NOT_FOUND\r\n #to indicate that the item you are trying to store with a "cas" command did not exist.
```

### Deletion

#### input

```bash
delete <key> [noreply]\r\n
```

#### output

```bash
DELETED\r\n #to indicate success or
NOT_FOUND\r\n #to indicate that the item with this key was not found.
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

Copyright (c) 2020 Brayan Steven Rendón
