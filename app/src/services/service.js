const pathUtils = require('path');

const { getConfigForService } = require('./config');
const compose = require('./compose');

async function runComposeForService(serviceName, args) {
    const serviceConfig = await getConfigForService(serviceName);
    await compose(
        pathUtils.join(`./services/local/${serviceName}`, serviceConfig.workingDirectory),
        serviceConfig.env,
        serviceName,
        [
            './docker-compose.yml',
            pathUtils.join(process.cwd(), `./config/${serviceName}/docker-compose.yml`)
        ],
        args);
}

module.exports = {
    up: async (serviceName) => await runComposeForService(serviceName, ['up', '-d']),
    down: async (serviceName) => await runComposeForService(serviceName, ['down'])
};
