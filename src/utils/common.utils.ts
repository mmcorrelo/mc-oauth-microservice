/**
 * Name: Identity Access Management
 * Copyright {Project Name} 2022 All Rights Reserved.
 * Author: Miguel Correlo
 * Node module: @oauth
 * This file is licensed under the MIT License.
 * License text available at https://opensource.org/licenses/MIT
 */

import { Transaction } from 'sequelize/types';

import DatabaseORM from '@configs/db.config';

export const transaction = async (f: () => void): Promise<any | null> => {
  const t: Transaction = await DatabaseORM.transaction();
  let result: any | null = null;

  try {
    result = await f();
    await t.commit();
  } catch (error: any) {
    await t.rollback();
  }

  return Promise.resolve(result);
};
