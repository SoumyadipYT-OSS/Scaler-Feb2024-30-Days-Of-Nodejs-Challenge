const { exec } = require('child_process');

function executeCommand(command) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error}`);
            return;
        }

        // If there was no error, print the output to the console
        console.log(`Command Output:`);
        console.log(stdout);
    });
}

// test cases:
executeCommand(`dir`);  // windows command
executeCommand(`ls -la`);   //   (Linux/macOS) command
executeCommand('echo "Hello, Node.js!"');