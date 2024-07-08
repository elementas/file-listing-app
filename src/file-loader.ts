import fs from 'node:fs/promises';
import path from 'node:path';
import * as config from './config';
import store from './redux/store';
import File from './interfaces/file';
import State from './interfaces/state';
import filesSlice from './redux/files-slice';
import DirectoryReadError from './errors/directory-read-error';

async function getDirectoryFileNames(directoryPath: string): Promise<string[]> {
    try {
        const directoryItems = await fs.readdir(directoryPath);
        const output: string[] = [];

        for (const itemName of directoryItems) {
            const fileStats = await fs.stat(path.join(directoryPath, itemName));

            if (fileStats.isFile() && itemName[0] !== '.') {
                output.push(itemName);
            }
        }

        return output;
    } catch (err: unknown) {
        throw new DirectoryReadError(
            directoryPath,
            err instanceof Error ? err : null
        );
    }
}

export async function load(
    directoryPath: string = config.fileDirectoryPath
): Promise<File[]> {
    const stateFiles: State = store.getState();
    const directoryFileNames = await getDirectoryFileNames(directoryPath);
    const output: File[] = [];

    for (const file of stateFiles) {
        const fileNameIndex = directoryFileNames.indexOf(file.name);

        if (fileNameIndex > -1) {
            continue;
        }

        output.push({
            name: file.name,
            active: false
        });
    }

    output.push(
        ...directoryFileNames.map(
            (fileName: string): File => ({
                name: fileName,
                active: true
            })
        )
    );

    store.dispatch(filesSlice.actions.update(output));

    return output;
}
