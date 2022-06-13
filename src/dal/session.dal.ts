/**
 * Name: Identity Access Management
 * Copyright {Project Name} 2022 All Rights Reserved.
 * Author: Miguel Correlo
 * Node module: @oauth
 * This file is licensed under the MIT License.
 * License text available at https://opensource.org/licenses/MIT
 */

import { Session } from '@models';
import { Op } from 'sequelize';

import { SessionInput, SessionOuput } from '@models/session.model';

export const create = async (payload: SessionInput): Promise<SessionOuput> => Session.create(payload);

export const desactive = async (payload: Pick<SessionInput, 'userId' | 'source'>): Promise<void> => {
  await Session.destroy({
    where: {
      userId: payload.userId,
      source: payload.source || null,
    },
  });
};

export const find = async (payload: Pick<SessionInput, 'userId' | 'source'>): Promise<SessionOuput | null> => {
  const session: SessionOuput | null = await Session.findOne({
    where: {
      userId: payload.userId,
      source: payload.source || null,
      deletedAt: {
        [Op.eq]: null,
      },
    },
    order: [['deletedAt', 'ASC']],
  });

  return session;
};

export const findByTokens = async (payload: Pick<SessionInput, 'authToken' | 'refreshToken'>): Promise<SessionOuput | null> => {
  const session: SessionOuput | null = await Session.findOne({
    where: {
      refreshToken: {
        [Op.like]: payload.refreshToken,
      },
      authToken: {
        [Op.like]: payload.authToken,
      },
      deletedAt: {
        [Op.eq]: null,
      },
    },
    order: [['deletedAt', 'ASC']],
  });

  return session;
};
