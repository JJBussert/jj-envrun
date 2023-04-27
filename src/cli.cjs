#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

import('./envrun.js').then(({ envrun }) => {
  const argv = yargs(hideBin(process.argv))
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
        .option('envFile', {
          alias: 'e',
          type: 'string',
          default: '.env',
          describe: 'The env file to save the environment variable',
        });
    },
    ({ targetKey, command, envFile }) => {
      envrun(targetKey, command, envFile);
      //const tk = argv.targetKey || 'World';
      //helloWorld(targetKey);
    }
  )
  .help().argv;

  
}).catch(err => {
  console.error('Error:', err);
});

