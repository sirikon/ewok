// import { struct } from 'superstruct'

const pathUtils = require('path');

const { readFileContent } = require('../infrastructure/filesystem');

// const configServiceStruct = struct({
//     workingDirectory: 'string',
//     env: 'object?'
// })

async function getConfigForService(serviceName) {
    const configFilePath = getServiceConfigFilePath(serviceName);
    const config = JSON.parse(await readFileContent(configFilePath));
    return config;
    //return configServiceStruct(config);
}

const getServiceConfigFilePath = (serviceName) =>
    pathUtils.join(getConfigsFolder(), serviceName, 'config.json');

const getConfigsFolder = () => 
    pathUtils.join(process.cwd(), 'config');

module.exports = {
    getConfigForService
}
