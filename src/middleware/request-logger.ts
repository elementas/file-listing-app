import express from 'express';
import logger from '../logger';

export default function setRequestLogger(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    const logWhenDone = () => {
        if (res.locals.finished) {
            return;
        }

        res.locals.finished = true;

        const statusCode = res.headersSent && res.statusCode;
        const runtime = new Date().getTime() - res.locals.timestamp;
        const timestamp = new Date(res.locals.timestamp).toISOString();
        const referer = req.get('referer') || req.get('referrer') || '';
        const userAgent = req.get('user-agent');
        const bytesWritten =
            req.socket.bytesWritten - res.locals.socketBytesWrittenStart;

        logger.log(
            'info',
            `${res.locals.id} - ${res.locals.ip} - [${timestamp}] "${req.method} ${req.originalUrl} HTTP/${req.httpVersion}" ${statusCode} ${bytesWritten} "${referer}" "${userAgent}" ${runtime}ms`
        );
    };

    res.once('error', logWhenDone);
    res.once('finish', logWhenDone);

    next();
}
