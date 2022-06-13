/**
 * Name: Identity Access Management
 * Copyright UCrypto Event 2022 All Rights Reserved.
 * Author: Miguel Correlo
 * Node module: @ucryptoevent/auth
 * This file is licensed under the MIT License.
 * License text available at https://opensource.org/licenses/MIT
 */

import * as AuthMiddleware from '@middlewares/auth.middleware';
import { IUser } from '@ucrypto-event/sdk';
import { APIError } from '@ucrypto-event/utils';
import { Router, Request, Response, NextFunction } from 'express';

import * as UsersController from '@controllers/users';
import { UserDTO } from '@dto';

export const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  const payload: UserDTO.Create = req.body;
  const result = await UsersController.create(payload);

  return res.status(200).send(result);
});

router.get('/all', async (req: Request, res: Response) => {
  const filters: UserDTO.Filter = req.query;
  const results = await UsersController.getAll(filters);

  return res.status(200).send(results);
});

router.get('/:id', [AuthMiddleware.validateAuthToken],
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    UsersController.getById(id)
      .then((result: IUser) => res.status(200).send(result))
      .catch((error: APIError) => next(error));
  });

export default router;
