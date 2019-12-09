const pathUtils = require('path');

const { checkFileOrDirectoryExists } = require('../infrastructure/filesystem');
const { getConfigForService } = require('./config');
const compose = require('./compose');
const git = require('./git');

async function ensureRepository(serviceName) {
    const serviceConfig = await getConfigForService(serviceName);
    if (!serviceConfig.repository) { return; }

    const serviceDirectory = getServiceDirectory(serviceName);
    if (!await checkFileOrDirectoryExists(serviceDirectory)) {
        await git.clone(serviceDirectory, serviceConfig.repository.url);
    }

    await git.fetch(serviceDirectory);
    await git.checkout(serviceDirectory, serviceConfig.repository.checkout);
    await git.pull(serviceDirectory);
}

async function runComposeForService(serviceName, args) {
    const serviceConfig = await getConfigForService(serviceName);
    await compose(
        pathUtils.join(`./services/${serviceName}`, serviceConfig.workingDirectory),
        serviceConfig.env,
        serviceName,
        [
            './docker-compose.yml',
            pathUtils.join(process.cwd(), `./config/${serviceName}/docker-compose.yml`)
        ],
        args);
}

const getServiceDirectory = (serviceName) =>
    pathUtils.join(process.cwd(), `/services/${serviceName}`);

module.exports = {
    up: async (serviceName) => await runComposeForService(serviceName, ['up', '-d']),
    down: async (serviceName) => await runComposeForService(serviceName, ['down']),
    update: async (serviceName) => await ensureRepository(serviceName)
};
