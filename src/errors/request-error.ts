import AppError from './app-error';

export interface RequestErrorArgs {
    message: string;
    statusCode: number;
    code: string;
    cause?: Error | null;
}

export const NOT_FOUND: RequestErrorArgs = {
    message: 'Page not found',
    statusCode: 404,
    code: 'not_found'
};
export const SERVER_ERROR: RequestErrorArgs = {
    message: 'Server error',
    statusCode: 500,
    code: 'server_error'
};

export default class RequestError extends AppError {
    statusCode: number;
    code: string;

    constructor(
        {
            message,
            statusCode = SERVER_ERROR.statusCode,
            code = SERVER_ERROR.code,
            cause = null
        }: RequestErrorArgs = { ...SERVER_ERROR }
    ) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.cause = cause;
    }
}
