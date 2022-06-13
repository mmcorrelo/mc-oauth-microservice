/**
 * Name: Identity Access Management
 * Copyright {Project Name} 2022 All Rights Reserved.
 * Author: Miguel Correlo
 * Node module: @oauth
 * This file is licensed under the MIT License.
 * License text available at https://opensource.org/licenses/MIT
 */

import { Router } from 'express';

import AuthRoutes from './auth.routes';
import UsersRoutes from './users.routes';

const router = Router();

router.use('/auth', AuthRoutes);
router.use('/users', UsersRoutes);

export default router;
