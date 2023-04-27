# jj-envset

`jj-envset` is a simple utility that helps you set environment variables by executing a command and saving its output as a key-value pair in a `.env` file. It can be used both as a command line tool and as a JavaScript module in your project.

## Installation

Install the package with the following command:

```bash
npm install jj-envset
```

## Usage

### Command Line

```bash
jj-envset <key> <command> [-e <envFile>]
```

- `<key>`: The environment variable key you want to set.
- `<command>`: The command to execute, whose output will be saved as the value for the `<key>`.
- `<envFile>` (optional): The path to the .env file. Defaults to .env in the current directory.

### JavaScript Module

```javascript
import { envset } from 'jj-envset';

const key = 'HELLO_WORLD';
const command = 'echo Hello World!';
const envFile = '.env';

envset(key, command, envFile);
```

- `key`: The environment variable key you want to set.
- `command`: The command to execute, whose output will be saved as the value for the key.
- `envFile (optional)`: The path to the .env file. Defaults to .env in the current directory.

## Example

Let's say you want to set the HELLO_WORLD environment variable with the output of the command echo Hello World!:

### Command Line

```bash
jj-envset HELLO_WORLD "echo Hello World!"
```

This will create or update the .env file in the current directory with the following content:
```
HELLO_WORLD="Hello World!"
```

### JavaScript Module

```
import { envset } from 'jj-envset';

const key = 'HELLO_WORLD';
const command = 'echo Hello World!';
const envFile = '.env';

envset(key, command, envFile);
```

This will create or update the .env file in the current directory with the following content:

```
HELLO_WORLD="Hello World!"
```

## License

MIT