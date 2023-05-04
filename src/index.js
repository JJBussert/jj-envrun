import { envset } from 'jj-envset';
import { run } from 'jj-run';

function envrun(targetKey, command, verbose, envFile) {
  const commandOutput = run(command, verbose, envFile);

  envset(targetKey, commandOutput, verbose, envFile);
}

export { envrun };
