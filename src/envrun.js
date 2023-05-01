// index.js
import { envset } from 'jj-envset';
import { execSync } from 'child_process';
import { run } from 'jj-run';

function envrun(targetKey, command, envFile) {
    // Execute the command and get its standard output
    //const commandOutput = execSync(command).toString().trim();
    
    const commandOutput = run(command, envFile);

    envset(targetKey, commandOutput, envFile);
}


  const isMainModule = import.meta.url === new URL(import.meta.url).pathname;
  
  if (isMainModule) {
    envrun();
  }
  
  export { envrun };
  