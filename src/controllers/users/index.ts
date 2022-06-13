/**
 * Name: Identity Access Management
 * Copyright UCrypto Event 2022 All Rights Reserved.
 * Author: Miguel Correlo
 * Node module: @ucryptoevent/iam
 * This file is licensed under the MIT License.
 * License text available at https://opensource.org/licenses/MIT
 */

import { IUser } from '@ucrypto-event/sdk';

import { UserDTO } from '@dto';
import { UsersService } from '@services';

import * as Converter from 'src/controllers/users/converter';

export const create = async (payload: UserDTO.Create): Promise<IUser> => Converter.toUser(await UsersService.create(payload));

export const getById = async (payload: string): Promise<IUser> => Converter.toUser(await UsersService.getById(payload));

export const getAll = async (payload: UserDTO.Filter): Promise<IUser[]> => (await UsersService.getAll(payload)).map(Converter.toUser);
