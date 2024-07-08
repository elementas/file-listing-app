import { v4 as uuidv4 } from 'uuid';
import express from 'express';

export default function setRequestInformation(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    const requestIdHeader = req.get('x-request-id');
    const requestId: string = requestIdHeader || uuidv4();

    if (!requestIdHeader) {
        res.set('x-request-id', requestId);
    }

    res.locals.id = requestId;
    res.locals.timestamp = new Date().getTime();
    res.locals.ip = req.socket.remoteAddress;
    res.locals.socketBytesWrittenStart = req.socket.bytesWritten;

    next();
}
