/**
 * Name: Identity Access Management
 * Copyright {Project Name} 2022 All Rights Reserved.
 * Author: Miguel Correlo
 * Node module: @oauth
 * This file is licensed under the MIT License.
 * License text available at https://opensource.org/licenses/MIT
 */

import { UserTypes } from '@dal/types';
import { User } from '@models';
import { ErrorMessages } from '@ucrypto-event/utils';
import { Op } from 'sequelize';

import { UserInput, UserOuput } from '@models/user.model';

export const create = async (payload: UserInput): Promise<UserOuput> => User.create(payload);

export const getById = async (id: string): Promise<UserOuput> => {
  const user = await User.findByPk(id);

  if (!user) {
    throw ErrorMessages.USER_NOT_FOUND(id);
  }

  return user;
};

export const getByEmail = async (email: string): Promise<UserOuput | null> => User.findOne({ where: { email } });

/*
export const update = async (id: number, payload: Partial<IngredientInput>): Promise<IngredientOuput> => {
  const ingredient = await Ingredient.findByPk(id)
  if (!ingredient) {
    // @todo throw custom error
    throw new Error('not found')
  }
  const updatedIngredient = await (ingredient as Ingredient).update(payload)
  return updatedIngredient
}

export const getById = async (id: number): Promise<IngredientOuput> => {
  const ingredient = await Ingredient.findByPk(id)
  if (!ingredient) {
    // @todo throw custom error
    throw new Error('not found')
  }
  return ingredient
}

export const deleteById = async (id: number): Promise<boolean> => {
  const deletedIngredientCount = await Ingredient.destroy({
    where: { id }
  })
  return !!deletedIngredientCount
}
*/

export const getAll = async (
  filters?: UserTypes.GetAllUsersFilters,
): Promise<UserOuput[]> => User.findAll({
  where: {
    ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
  },
  ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true }),
});
