import express from 'express';
import helmet from 'helmet';
import requestInformation from './middleware/request-information';
import requestLogger from './middleware/request-logger';
import errorHandlers from './middleware/error-handlers';
import router from './router';

const app = express();

app.use(requestInformation);
app.use(requestLogger);
app.use(helmet());
app.use(express.json());
app.use(router);
app.use(...errorHandlers);

export default app;
