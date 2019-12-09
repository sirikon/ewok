#!/usr/bin/env node

async function main() {
    const service = require('../src/services/service');
    const args = process.argv.slice(2);
    
    const serviceName = args[0];
    const command = args[1];
    switch(args[1]) {
        case 'up': await service.up(serviceName); break;
        case 'down': await service.down(serviceName); break;
        case 'update': await service.update(serviceName); break;
        default: console.log(`Unknown command ${command}`);
    }
}

main().then(
    () => {},
    (err) => console.log(err));
