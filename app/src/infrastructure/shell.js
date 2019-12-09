const { spawn } = require('child_process');

function runCommand(command, params, env, cwd) {
    return new Promise((resolve, reject) => {
        const proc = spawn(command, params, {
            env: Object.assign({}, process.env, env),
            cwd
        });

        proc.stdout.on('data', (chunk) => {
            process.stdout.write(chunk);
        });

        proc.stderr.on('data', (chunk) => {
            process.stdout.write(chunk);
        });

        proc.on('close', (code) => {
            if (code) {
                reject(new Error(`Process exited with code ${code}`));
                return;
            }
            resolve();
        });
    });
}

module.exports = {
    runCommand
}
