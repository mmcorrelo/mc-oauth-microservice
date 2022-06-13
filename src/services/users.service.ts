/**
 * Name: Identity Access Management
 * Copyright {Project Name} 2022 All Rights Reserved.
 * Author: Miguel Correlo
 * Node module: @oauth
 * This file is licensed under the MIT License.
 * License text available at https://opensource.org/licenses/MIT
 */

import { UserInput, UserOuput } from '@models/user.model';

import { UserDAL } from 'src/dal';
import { UserTypes } from 'src/dal/types';

export const create = (payload: UserInput): Promise<UserOuput> => UserDAL.create(payload);

export const getById = (payload: string): Promise<UserOuput> => UserDAL.getById(payload);

export const getByEmail = (payload: string): Promise<UserOuput | null> => UserDAL.getByEmail(payload);

export const getAll = (filters: UserTypes.GetAllUsersFilters): Promise<Array<UserOuput>> => UserDAL.getAll(filters);
