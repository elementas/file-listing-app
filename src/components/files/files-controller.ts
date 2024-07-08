import express from 'express';
import store from '../../redux/store';
import * as fileLoader from '../../file-loader';
import logger from '../../logger';
import RequestError, { SERVER_ERROR } from '../../errors/request-error';

export function listFiles(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    res.json(store.getState());
}

export async function scanFiles(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    try {
        const files = await fileLoader.load();
        res.json(files);
    } catch (err) {
        logger.error(err);
        next(new RequestError({ ...SERVER_ERROR }));
    }
}

export function downloadState(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    const files = store.getState();
    res.set({
        'Content-Disposition': `attachment; filename=state.json`
    });
    res.json(files);
}
