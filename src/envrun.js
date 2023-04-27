// index.js

import fs from 'fs';
import dotenv from 'dotenv';
import os from 'os';
import { execSync } from 'child_process';

function envrun(targetKey, command, envFile) {
    // Execute the command and get its standard output
    const commandOutput = execSync(command).toString().trim();

    // Check if the .env file exists
    const envFileExists = fs.existsSync(envFile);

    let dotenvObj;

    if (envFileExists) {
        // If the .env file exists, load it into process.env and parse its contents
        dotenvObj = dotenv.config({ path: envFile }).parsed;
    } else {
        // If the .env file does not exist, create an empty object
        dotenvObj = {};
    }

    // Update or create the key-value pair in the dotenvObj
    if (dotenvObj.hasOwnProperty(targetKey)) {
        // If the key already exists, update the value
        console.log(`Updating ${targetKey} in .env file`);
    } else {
        // If the key does not exist, add it to the environment
        console.log(`Adding ${targetKey} to .env file`);
    }

    dotenvObj[targetKey] = commandOutput;

    // Save the environment variable to the .env file
    const env = Object.entries(dotenvObj)
        .map(([key, value]) => `${key}="${value}"`)
        .join(os.EOL);
    fs.writeFileSync(envFile, env);
}


  const isMainModule = import.meta.url === new URL(import.meta.url).pathname;
  
  if (isMainModule) {
    envrun();
  }
  
  export { envrun };
  