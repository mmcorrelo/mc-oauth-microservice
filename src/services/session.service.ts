/**
 * Name: Identity Access Management
 * Copyright UCrypto Event 2022 All Rights Reserved.
 * Author: Miguel Correlo
 * Node module: @ucryptoevent/auth
 * This file is licensed under the MIT License.
 * License text available at https://opensource.org/licenses/MIT
 */

import { SessionDAL } from '@dal';

import { SessionInput, SessionOuput } from '@models/session.model';
import * as AuthUtils from '@utils/auth.utils';
import * as CommonUtils from '@utils/common.utils';

export const create = (payload: SessionInput): Promise<SessionOuput> => SessionDAL.create(payload);

export const find = (payload: Pick<SessionInput, 'userId' | 'source'>): Promise<SessionOuput | null> => SessionDAL.find(payload);

export const findByTokens = (payload: Pick<SessionInput, 'authToken' | 'refreshToken'>): Promise<SessionOuput | null> => SessionDAL.findByTokens(payload);

export const desactive = (payload: Pick<SessionInput, 'userId' | 'source'>): Promise<void> => SessionDAL.desactive(payload);

export const refresh = async (payload: SessionInput): Promise<SessionOuput | null> => {
  return CommonUtils.transaction(async () => {
    await SessionDAL.desactive({ userId: payload.userId, source: payload.source });

    return SessionDAL.create({
      userId: payload.userId,
      authToken: AuthUtils.generateAuthToken({ userId: payload.userId }),
      refreshToken: payload.refreshToken,
      source: payload.source,
      renewed: true,
    });
  });
};
