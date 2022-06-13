/**
 * Name: Identity Access Management
 * Copyright {Project Name} 2022 All Rights Reserved.
 * Author: Miguel Correlo
 * Node module: @ucryptoevent/iam
 * This file is licensed under the MIT License.
 * License text available at https://opensource.org/licenses/MIT
 */

import { ISessionUser } from '@ucrypto-event/sdk';

import { SessionOuput } from '@models/session.model';

export const toSession = (user: SessionOuput): ISessionUser => {
  return {
    userId: user.userId,
    source: user.source,
    accessToken: user.authToken,
    refreshToken:user.refreshToken,
  };
};

export const toAccessToken = (user: SessionOuput): Pick<ISessionUser, 'accessToken'> => {
  return {
    accessToken: user.authToken,
  };
};
