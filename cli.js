#!/usr/bin/env node

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { envrun } from './src/index.js';

const argv = yargs(hideBin(process.argv))
  .scriptName('jj-envrun')
  .command(
    '$0 <targetKey> <command>',
    'Execute a command and save its output to an environment variable in an env file',
    (yargs) => {
      yargs
        .positional('targetKey', {
          describe: 'The target environment variable key',
          type: 'string',
        })
        .positional('command', {
          describe: 'The command to execute',
          type: 'string',
        })
    }
  )
  .option('e', {
    alias: 'envFile',
    type: 'string',
    default: '.env',
    describe: 'The env file to save the environment variable',
  })
  .option('v', {
    alias: 'verbose',
    type: 'boolean',
    default: 'false',
    describe: 'Verbose console output'
  })
  .demandCommand(2, 'You must provide a targetKey and a command to run')
  .argv;

envrun(argv.targetKey, argv.command, argv.verbose, argv.envFile);