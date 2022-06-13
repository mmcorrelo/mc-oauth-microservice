/**
 * Name: Identity Access Management
 * Copyright {Project Name} 2022 All Rights Reserved.
 * Author: Miguel Correlo
 * Node module: @oauth
 * This file is licensed under the MIT License.
 * License text available at https://opensource.org/licenses/MIT
 */

import {
  CreationOptional, DataTypes, Model, Optional,
} from 'sequelize';

import User from './user.model';
import SQLConnection from '@configs/db.config';

interface ISessionAttributes {
  id: number;
  userId: number;
  refreshToken: string;
  authToken: string;
  renewed: boolean;
  source?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface SessionInput extends Optional<ISessionAttributes, 'id'> {}
export interface SessionOuput extends Required<ISessionAttributes> {}

class Session
  extends Model<ISessionAttributes, SessionInput>
  implements ISessionAttributes {
  declare id: number;

  declare authToken: string;

  declare refreshToken: string;

  declare renewed: boolean;

  declare source: string;

  declare userId: number;

  // timestamps
  declare createdAt: CreationOptional<Date>;

  declare updatedAt: CreationOptional<Date>;

  declare deletedAt: CreationOptional<Date>;
}

Session.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    authToken: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    renewed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    sequelize: SQLConnection,
    paranoid: true, // soft delete
  },
);

User.hasMany(Session, {
  foreignKey: 'userId',
  sourceKey: 'id',
  as: 'sessionUser',
});

export default Session;
