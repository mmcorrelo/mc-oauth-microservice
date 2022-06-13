/**
 * Name: Identity Access Management
 * Copyright UCrypto Event 2022 All Rights Reserved.
 * Author: Miguel Correlo
 * Node module: @ucryptoevent/auth
 * This file is licensed under the MIT License.
 * License text available at https://opensource.org/licenses/MIT
 */

import http from 'http';

import { APIError, ErrorHandler, Logger } from '@ucrypto-event/utils';
import express, {
  Express, Request, Response, NextFunction,
} from 'express';

import SQLInit from '@configs/init';
import AppRoutes from '@routes';

Logger.initialize(process.env.NODE_ENV === 'development');
const router: Express = express();

/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());

/** RULES OF OUR API */
router.use((req: Request, res: Response, next: NextFunction) => {
  // set the CORS policy
  res.header('Access-Control-Allow-Origin', '*');
  // set the CORS headers
  res.header(
    'Access-Control-Allow-Headers',
    'origin, X-Requested-With,Content-Type,Accept, Authorization',
  );
  // set the CORS method headers
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
    return res.status(200).json({});
  }

  return next();
});

/** Routes */
router.use('/v1', AppRoutes);

/** Error Handling */
router.use((err: APIError, req: Request, res: Response, next: NextFunction) => {
  if (err.isOperational) {
    res.status(err.httpCode).send(err.message);
  } else {
    Logger.error(`[${ req.path }]: ${ err.message }`);
  }

  next();
});

/** Process error handling */
process.on('unhandledRejection', (reason: Error) => {
  throw reason;
});

process.on('uncaughtException', (error: Error) => {
  ErrorHandler.handleError(error);

  if (!ErrorHandler.isTrustedError(error)) {
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
});

/** Server */
const httpServer = http.createServer(router);
const { PORT } = process.env;

SQLInit();
httpServer.listen(PORT, () => Logger.info(`The server is running on port ${ PORT }`));
