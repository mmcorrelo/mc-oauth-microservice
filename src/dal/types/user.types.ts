/**
 * Name: Identity Access Management
 * Copyright UCrypto Event 2022 All Rights Reserved.
 * Author: Miguel Correlo
 * Node module: @ucryptoevent/auth
 * This file is licensed under the MIT License.
 * License text available at https://opensource.org/licenses/MIT
 */

export interface GetAllUsersFilters {
  isDeleted?: boolean;
  includeDeleted?: boolean;
}
