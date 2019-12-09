const { runCommand } = require('../infrastructure/shell');

async function git(workDir, args) {
    await runCommand('git', args, {}, workDir);
}

module.exports = {
    clone: async (workDir, repository) => await git(process.cwd(), ['clone', repository, workDir]),
    fetch: async (workDir) => await git(workDir, ['fetch', '--all']),
    checkout: async (workDir, target) => await git(workDir, ['checkout', target]),
    pull: async (workDir) => await git(workDir, ['pull'])
}
