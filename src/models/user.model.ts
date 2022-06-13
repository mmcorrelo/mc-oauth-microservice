/**
 * Name: Identity Access Management
 * Copyright {Project Name} 2022 All Rights Reserved.
 * Author: Miguel Correlo
 * Node module: @oauth
 * This file is licensed under the MIT License.
 * License text available at https://opensource.org/licenses/MIT
 */

import { DataTypes, Model, Optional } from 'sequelize';

import SQLConnection from '@configs/db.config';

interface IUserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  validated: boolean;
  salt?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface UserInput extends Optional<IUserAttributes, 'id'> {}
export interface UserOuput extends Required<IUserAttributes> {}

class User
  extends Model<IUserAttributes, UserInput>
  implements IUserAttributes {
  id!: number;

  name!: string;

  email!: string;

  password!: string;

  salt!: string;

  validated!: boolean;

  // timestamps!
  readonly createdAt!: Date;

  readonly updatedAt!: Date;

  readonly deletedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    validated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    sequelize: SQLConnection,
    paranoid: true, // soft delete
  },
);

export default User;
