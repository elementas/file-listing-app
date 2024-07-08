import http from 'node:http';

import * as config from './config';
import logger from './logger';
import app from './app';
import * as fileLoader from './file-loader';

const HTTP_CLOSE_TIMEOUT_MS = 10000;

let shuttingDown = false;
let exitCode = 0;
let server: http.Server;

function shutdown(reason: NodeJS.Signals | Error | string | undefined) {
    if (shuttingDown) {
        process.exit(exitCode);
    }

    shuttingDown = true;

    if (reason instanceof Error) {
        exitCode = 1;
        logger.error('Shutting down...');
        logger.error('Error:', reason);
    } else {
        logger.info('Shutting down...');
        if (reason) {
            logger.info(reason);
        }
    }

    if (server) {
        server.close(() => process.exit(exitCode));
        setTimeout(() => process.exit(1), HTTP_CLOSE_TIMEOUT_MS);
    } else {
        process.exit(exitCode);
    }
}

async function main() {
    await fileLoader.load();

    server = http.createServer(app);

    server.on('error', shutdown);

    server.listen(config.port, '0.0.0.0', () => {
        logger.info(`Listening on port ${config.port}`);
    });
}

process.once('uncaughtException', shutdown);
process.once('unhandledRejection', shutdown);
process.once('SIGTERM', shutdown);
process.once('SIGINT', shutdown);

main();
