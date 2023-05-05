import { expect, test } from 'vitest';
import { envrun } from '../src/index.js';
import fs from 'fs';

test('envrun: should save the output of the command to the specified key in the env file', async () => {
  // arrange
  const envFile = '.env.test1';
  
  if (fs.existsSync(envFile)) {// Remove the envFile if it exists
    fs.unlinkSync(envFile);
  }

  // act
  envrun('NEW_KEY', 'echo New Content', false, envFile);

  // assert
  const envContent = fs.readFileSync(envFile, 'utf-8');
  expect(envContent).toContain('NEW_KEY="New Content"');

  // cleanup
  fs.unlinkSync(envFile);
});

test('envrun: should update an existing env file with a new var', async () => {
  
  // arrange
  const envFile = '.env.test2';
  fs.writeFileSync(envFile, 'UNIT_TEST="Hello World"\n');

  // act
  envrun('NEW_KEY', 'echo New Content', false, envFile);

  // assert
  const envContent = fs.readFileSync(envFile, 'utf-8');
  expect(envContent).toContain('NEW_KEY="New Content"');
  expect(envContent).toContain('UNIT_TEST="Hello World"'); // check if original key is unaffected

  // cleanup
  fs.unlinkSync(envFile);
});

test('envrun: should update an existing env file with new content from existing environment var', async () => {

  // arrange
  const envFile = '.env.test3';
  fs.writeFileSync(envFile, 'UNIT_TEST="Hello World"\n');

  // act
  envrun('NEW_KEY', 'echo "$UNIT_TEST"', false, envFile);

  // assert
  const envContent = fs.readFileSync(envFile, 'utf-8');
  expect(envContent).toContain('NEW_KEY="Hello World"');
  expect(envContent).toContain('UNIT_TEST="Hello World"'); // check if original key is unaffected

  // cleanup
  fs.unlinkSync(envFile);
});

test('envrun: should update an quote existing values if they were not', async () => {

  // arrange
  const envFile = '.env.test4';
  fs.writeFileSync(envFile, 'UNIT_TEST=Hello World\n'); // arranged file will not be quoted

  // act
  envrun('NEW_KEY', 'echo "$UNIT_TEST"', false, envFile);

  // assert
  const envContent = fs.readFileSync(envFile, 'utf-8');
  expect(envContent).toContain('NEW_KEY="Hello World"');
  expect(envContent).toContain('UNIT_TEST="Hello World"'); // check if original key is now quoted

  // cleanup
  fs.unlinkSync(envFile);
});
