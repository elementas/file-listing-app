import AppError from './app-error';

export default class DirectoryReadError extends AppError {
    constructor(directoryPath: string, cause: Error | null = null) {
        super(`Failed to load files from directory: ${directoryPath}`);
        this.cause = cause;
    }
}
