/**
 * Name: Identity Access Management
 * Copyright UCrypto Event 2022 All Rights Reserved.
 * Author: Miguel Correlo
 * Node module: @ucryptoevent/iam
 * This file is licensed under the MIT License.
 * License text available at https://opensource.org/licenses/MIT
 */

import { IUser } from '@ucrypto-event/sdk';

import { UserOuput } from '@models/user.model';

export const toUser = (user: UserOuput): IUser => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    deletedAt: user.deletedAt,
  };
};