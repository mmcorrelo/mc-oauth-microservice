/**
 * Name: Identity Access Management
 * Copyright {Project Name} 2022 All Rights Reserved.
 * Author: Miguel Correlo
 * Node module: @ucryptoevent/iam
 * This file is licensed under the MIT License.
 * License text available at https://opensource.org/licenses/MIT
 */


import bcrypt from 'bcryptjs';
import { ErrorMessages } from '@lib/utils';
import { ISessionUser, IUser } from '@project/sdk';

import * as SessionConverter from '@controllers/auth/converter';
import * as UserConverter from '@controllers/users/converter';
import { AuthDTO } from '@dto';
import { SessionInput, SessionOuput } from '@models/session.model';
import { UserInput, UserOuput } from '@models/user.model';
import { SessionService, UsersService } from '@services';
import * as AuthUtils from '@utils/auth.utils';

export const signup = async (payload: AuthDTO.Signup): Promise<IUser> => {
  const salt: string = await bcrypt.genSalt(8);
  const user: UserInput = {
    ...payload,
    salt,
    validated: false,
    password: bcrypt.hashSync(`${ payload.password }${ salt }`, 8),
  };

  return UserConverter.toUser(await UsersService.create(user));
};

export const signin = async (payload: AuthDTO.Signin): Promise<ISessionUser> => {
  const user: UserOuput | null = await UsersService.getByEmail(payload.email);

  if (user) {
    const isUserLoggedIn: boolean = await bcrypt.compare(`${ payload.password }${ user.salt }`, user.password);
    if (isUserLoggedIn) {
      const sessionParams: Pick<SessionInput, 'userId' | 'source'> = { userId: user.id, source: payload.source };
      const session: SessionOuput | null = await SessionService.find(sessionParams);

      if (session?.authToken) {
        const isValid = await AuthUtils.isAuthTokenValid(session.authToken);

        if (isValid) {
          return SessionConverter.toSession(session);
        }

        await SessionService.desactive(sessionParams);
      }

      const sessionUser: SessionOuput = await SessionService.create({
        userId: user.id,
        authToken: AuthUtils.generateAuthToken({ userId: user.id }),
        refreshToken: AuthUtils.generateRefreshToken({ userId: user.id }),
        source: payload.source,
        renewed: false,
      });

      return SessionConverter.toSession(sessionUser);
    }
  }

  throw ErrorMessages.AUTH_UNAUTHORIZED;
};

export const refresh = async (payload: AuthDTO.RefreshToken): Promise<Pick<ISessionUser, 'accessToken'>> => {
  const session: SessionOuput | null = await SessionService.findByTokens({
    authToken: payload.authToken,
    refreshToken: payload.refreshToken,
  });

  if (session) {
    const isValid = await AuthUtils.isAuthTokenValid(session.authToken);

    if (isValid) {
      return SessionConverter.toAccessToken(session);
    }

    const renewedSession: SessionOuput | null = await SessionService.refresh(session);
    
    if (renewedSession) {
      return SessionConverter.toAccessToken(renewedSession);
    }
  }

  throw ErrorMessages.AUTH_INVALID_TOKEN;
};
