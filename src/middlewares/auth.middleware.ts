/**
 * Name: Identity Access Management
 * Copyright {Project Name} 2022 All Rights Reserved.
 * Author: Miguel Correlo
 * Node module: @oauth
 * This file is licensed under the MIT License.
 * License text available at https://opensource.org/licenses/MIT
 */

import { ErrorMessages } from '@ucrypto-event/utils';
import { Request, Response, NextFunction } from 'express';

import CommonConstants from '@configs/common.constants';
import { AuthDTO } from '@dto';
import { UserOuput } from '@models/user.model';
import { UsersService } from '@services';
import * as AuthUtils from '@utils/auth.utils';

const validateAuthToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token: string | undefined = AuthUtils.parseAuthToken(req.headers);

  if (!token) {
    return next(ErrorMessages.AUTH_INVALID_TOKEN);
  }

  const isValid: boolean = await AuthUtils.isAuthTokenValid(token);

  return next(!isValid ? ErrorMessages.AUTH_INVALID_TOKEN : undefined);
};

const validateRefreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authToken = AuthUtils.parseAuthToken(req.headers);
  const refreshToken: string = req.body.refreshToken;

  if (!authToken || !refreshToken) {
    return next(ErrorMessages.AUTH_INVALID_TOKEN);
  }

  const isValid: boolean = await AuthUtils.isRefreshTokenValid(refreshToken);

  return next(!isValid ? ErrorMessages.AUTH_INVALID_TOKEN : undefined);
};

const validateDuplicatedUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const payload: AuthDTO.Signup = req.body;
  const user: UserOuput | null = await UsersService.getByEmail(payload.email);

  next(user ? ErrorMessages.USER_ALREADY_EXISTS : undefined);
};

const validateEmail = (req: Request, res: Response, next: NextFunction) => {
  const user: AuthDTO.Signup = req.body;
  const isValid = CommonConstants.EMAIL_REGEX.test(user.email);

  return next(!isValid ? ErrorMessages.AUTH_EMAIL_VALIDATION : undefined);
};

const validateSource = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const source: string | undefined = req.body.source;
  const isValid: boolean = !!source && CommonConstants.AUTH_SOURCES.includes(source);

  return next(!isValid ? ErrorMessages.AUTH_INVALID_SOURCE : undefined);
};

export {
  validateDuplicatedUsers,
  validateEmail,
  validateAuthToken,
  validateSource,
  validateRefreshToken,
};
