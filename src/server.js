import * as OpenApiValidator from 'express-openapi-validator';
import authHandler from './middlewares/authHandler.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import esmResolver from './middlewares/esmResolver.js';
import express from 'express';
import expressPino from 'pino-http';
import fs from 'fs';
import helmet from 'helmet';
import logger from './helpers/logger.js';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const swaggerDocument = yaml.load(fs.readFileSync(path.join(__dirname, 'openapi', 'api.yml'), 'utf8'));

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressPino({ logger }));
app.use(cors(corsOptions));
app.use(helmet());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  OpenApiValidator.middleware({
    apiSpec: path.join(__dirname, 'openapi', 'api.yml'),
    validateRequests: true,
    validateResponses: true,
    validateSecurity: {
      handlers: {
        bearerAuth: authHandler,
      },
    },
    operationHandlers: {
      basePath: path.join(__dirname, 'controllers'),
      resolver: esmResolver,
    },
  }),
);

export default app;
