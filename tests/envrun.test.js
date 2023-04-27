import { expect, test } from 'vitest';
import { envrun } from '../src/envrun.js';
import fs from 'fs';
import { execSync } from 'child_process';

test('envrun: should save the output of the command to the specified key in the env file', async () => {
  const targetKey = 'HELLO_WORLD';
  const command = 'echo Hello World!';
  const envFile = '.env.test';

  // Remove the envFile if it exists
  if (fs.existsSync(envFile)) {
    fs.unlinkSync(envFile);
  }

  // Call the envrun function
  envrun(targetKey, command, envFile);

  // Read the updated env file
  const envContent = fs.readFileSync(envFile, 'utf-8');
  const expectedOutput = `${targetKey}="${execSync(command).toString().trim()}"`;

  // Check if the target key and value are present in the env file
  expect(envContent).toContain(expectedOutput);

  // Clean up by removing the envFile
  fs.unlinkSync(envFile);
});

test('envrun: should update an existing env file with new content', async () => {
  const targetKey = 'NEW_KEY';
  const command = 'echo Updated Value!';
  const envFile = '.env.test';

  // Create an initial env file with some content
  fs.writeFileSync(envFile, 'INITIAL_KEY="Initial Value"\n');

  // Call the envrun function to update the env file with new content
  envrun(targetKey, command, envFile);

  // Read the updated env file
  const envContent = fs.readFileSync(envFile, 'utf-8');
  const expectedOutput = `${targetKey}="${execSync(command).toString().trim()}"`;

  // Check if the target key and value are present in the env file
  expect(envContent).toContain(expectedOutput);
  expect(envContent).toContain('INITIAL_KEY="Initial Value"');

  // Clean up by removing the envFile
  fs.unlinkSync(envFile);
});

test('envrun: should update an quote existing values if they were not', async () => {
  const targetKey = 'NEW_KEY';
  const command = 'echo Updated Value!';
  const envFile = '.env.test';

  // Create an initial env file with some content
  fs.writeFileSync(envFile, 'INITIAL_KEY=Initial Value\n');

  // Call the envrun function to update the env file with new content
  envrun(targetKey, command, envFile);

  // Read the updated env file
  const envContent = fs.readFileSync(envFile, 'utf-8');
  const expectedOutput = `${targetKey}="${execSync(command).toString().trim()}"`;

  // Check if the target key and value are present in the env file
  expect(envContent).toContain('INITIAL_KEY="Initial Value"');

  // Clean up by removing the envFile
  fs.unlinkSync(envFile);
});
