import { envset } from 'jj-envset';
import { run } from 'jj-run';

function envrun(targetKey, command, verbose, envFile) {
  if(verbose) {
    console.log(`targetKey ${targetKey}`);
    console.log(`command ${command}`);
    console.log(`envFile ${envFile}`);
  }
  const commandOutput = run(command, envFile, verbose);

  envset(targetKey, commandOutput, verbose, envFile);
}

export { envrun };
