import express from 'express';
import RequestError, { NOT_FOUND, SERVER_ERROR } from '../errors/request-error';

export function onNotFound(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    next(new RequestError({ ...NOT_FOUND }));
}

export function onError(
    err: Error | RequestError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    if (err instanceof RequestError) {
        res.status(err.statusCode).json({
            message: err.message,
            code: err.code
        });
    } else {
        res.status(500).json({
            message: SERVER_ERROR.message,
            code: SERVER_ERROR.code
        });
    }
}

export default [onNotFound, onError];
