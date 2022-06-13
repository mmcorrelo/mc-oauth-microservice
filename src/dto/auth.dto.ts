/**
 * Name: Identity Access Management
 * Copyright {Project Name} 2022 All Rights Reserved.
 * Author: Miguel Correlo
 * Node module: @oauth
 * This file is licensed under the MIT License.
 * License text available at https://opensource.org/licenses/MIT
 */

export type Signup = {
  name: string;
  email: string;
  password: string;
};

export type RefreshToken = {
  authToken: string;
  refreshToken: string;
};

export type Signin = {
  email: string;
  password: string;
  source?: string;
};
