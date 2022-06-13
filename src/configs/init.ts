/**
 * Name: Identity Access Management
 * Copyright UCrypto Event 2022 All Rights Reserved.
 * Author: Miguel Correlo
 * Node module: @ucryptoevent/auth
 * This file is licensed under the MIT License.
 * License text available at https://opensource.org/licenses/MIT
 */

import { Session, User } from '@models';

const alter: boolean = Boolean(process.env.DB_ALTER);
const SQLInit: () => void = () => {
  User.sync({ alter, force: true });
  Session.sync({ alter, force: true });
};

export default SQLInit;
