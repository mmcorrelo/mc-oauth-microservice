/**
 * Name: Identity Access Management
 * Copyright UCrypto Event 2022 All Rights Reserved.
 * Author: Miguel Correlo
 * Node module: @ucryptoevent/auth
 * This file is licensed under the MIT License.
 * License text available at https://opensource.org/licenses/MIT
 */

import * as AuthMiddleware from '@middlewares/auth.middleware';
import { ISessionUser, IUser } from '@ucrypto-event/sdk';
import { APIError, ErrorMessages } from '@ucrypto-event/utils';
import { Router, Request, Response, NextFunction } from 'express';

import * as AuthController from '@controllers/auth';
import { AuthDTO } from '@dto';
import * as AuthUtils from '@utils/auth.utils';

export const router = Router();

router.post('/signup', [AuthMiddleware.validateEmail, AuthMiddleware.validateDuplicatedUsers],
  async (req: Request, res: Response) => {
    const payload: AuthDTO.Signup = req.body;
    const user: IUser = await AuthController.signup(payload);

    return res.status(200).send(user);
  });

router.get('/signin', [AuthMiddleware.validateSource],
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
      return next(ErrorMessages.AUTH_INVALID_HEADER);
    }

    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');
    const { source } = req.body;

    AuthController.signin({ email, password, source })
      .then((session: ISessionUser) => res.status(200).send(session))
      .catch((error: APIError) => next(error));
  });

router.post('/refresh', [AuthMiddleware.validateRefreshToken],
  async (req: Request, res: Response, next: NextFunction) => {
    const authToken: string = AuthUtils.parseAuthToken(req.headers) as string;
    const refreshToken: string = req.body.refreshToken;

    AuthController.refresh({ authToken, refreshToken })
      .then((token: Pick<ISessionUser, 'accessToken'>) => res.status(200).send(token))
      .catch((error: APIError) => next(error));
  });

export default router;
