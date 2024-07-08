import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({
    path: path.join(__dirname, '../.env')
});

import { toPort, toPath } from './utils';

const { APP_PORT, APP_PATH } = process.env;

export const port = toPort(APP_PORT, 3000);
export const fileDirectoryPath = toPath(
    APP_PATH,
    path.join(__dirname, '../input')
);
