/**
 * Name: Identity Access Management
 * Copyright UCrypto Event 2022 All Rights Reserved.
 * Author: Miguel Correlo
 * Node module: @ucryptoevent/auth
 * This file is licensed under the MIT License.
 * License text available at https://opensource.org/licenses/MIT
 */

import { IncomingHttpHeaders } from 'http';

import { ISessionUser } from '@ucrypto-event/sdk';
import jwt from 'jsonwebtoken';

import AuthConstants from '@configs/auth.constants';

export const isAuthTokenValid = (token: string): Promise<boolean> => new Promise((resolve: (value: boolean | PromiseLike<boolean>) => void) => {
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as jwt.Secret, (err: any) => resolve(!err));
});

export const isRefreshTokenValid = (token: string): Promise<boolean> => new Promise((resolve: (value: boolean | PromiseLike<boolean>) => void) => {
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as jwt.Secret, (err: any) => resolve(!err));
});

export const generateAuthToken = (user: ISessionUser): string => {
  const secret: jwt.Secret = process.env.ACCESS_TOKEN_SECRET as string;

  return jwt.sign(user, secret, { expiresIn: AuthConstants.ACCESS_TOKEN_EXPIRATION });
};

export const generateRefreshToken = (user: ISessionUser): string => {
  const secret: jwt.Secret = process.env.REFRESH_TOKEN_SECRET as string;

  return jwt.sign(user, secret, { expiresIn: AuthConstants.REFRESH_TOKEN_EXPIRATION });
};

export const parseAuthToken = (headers: IncomingHttpHeaders): string | undefined => {
  const { authorization } = headers;

  if (!authorization || authorization.indexOf('Bearer ') === -1) {
    return undefined;
  }

  const [, token] = authorization.split(' ');

  return token;
};
