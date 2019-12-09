const { runCommand } = require('../infrastructure/shell');

module.exports = async function compose(cwd, env, projectName, composeFiles, args) {
    const dockerComposeArgs = ['--project-name', projectName];
    composeFiles.forEach(f => {
        dockerComposeArgs.push('-f')
        dockerComposeArgs.push(f);
    });
    args.forEach((a) => dockerComposeArgs.push(a));
    await runCommand('docker-compose', dockerComposeArgs, env, cwd);
}
