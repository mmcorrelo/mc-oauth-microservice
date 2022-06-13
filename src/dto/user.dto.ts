/**
 * Name: Identity Access Management
 * Copyright UCrypto Event 2022 All Rights Reserved.
 * Author: Miguel Correlo
 * Node module: @ucryptoevent/auth
 * This file is licensed under the MIT License.
 * License text available at https://opensource.org/licenses/MIT
 */

export type Create = {
  name: string;
  email: string;
  password: string;
  validated: boolean;
  salt: string;
};

export type Update = Omit<Create, 'salt'>;

export type Filter = {
  isDeleted?: boolean;
  includeDeleted?: boolean;
};
