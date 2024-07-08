import winston from 'winston';

const { format } = winston;
const logger: winston.Logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({
            format: format.combine(format.timestamp(), format.prettyPrint())
        })
    ]
});

logger.on('error', (err) => console.error('Logger error:', err));

export default logger;
