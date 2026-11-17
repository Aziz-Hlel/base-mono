import { route } from '@/openapi/routeBuilder';
import { userIdParamSchema } from '@base-monorepo-v2/contracts/schemas/user/get-user-params.req';
import { updateUserReqSchema } from '@base-monorepo-v2/contracts/schemas/user/update-user.req';
import { userResSchema } from '@base-monorepo-v2/contracts/schemas/user/user.res';
import allAdminRoles from '@base-monorepo-v2/contracts/utils/roles/all-admin-roles';
import express from 'express';
import { userService } from './user.service';

const userRouter = express.Router();

// GET /api/users/me
route()
  .router(userRouter)
  .method('get')
  .path('/me')
  .openapiPath('/api/users/me')
  .operationId('getMe')
  .summary('Get current authenticated user')
  .description('Returns the profile information of the currently authenticated user.')
  .tags('Users')
  .define({
    userRoles: [],
    auth: true,
    validate: {},
    response: userResSchema,
    responses: {
      '200': {
        description: 'User profile retrieved successfully',
        schema: userResSchema,
      },
    },

    controller: async (req, res) => {
      const data = await userService.getMe(req.user.id);

      res.json({
        message: 'Current user retrieved successfully',
        data,
      });
    },
  });

// PUT /api/users/:id
route()
  .router(userRouter)
  .method('put')
  .path('/:id')
  .openapiPath('/api/users/{id}')
  .operationId('updateUser')
  .summary('Update user')
  .description('Update user credentials and username by ID.')
  .tags('Users')
  .define({
    userRoles: allAdminRoles,
    auth: true,
    validate: {
      params: userIdParamSchema,
      body: updateUserReqSchema,
    },
    response: userResSchema,
    responses: {
      '200': {
        description: 'User updated successfully',
        schema: userResSchema,
      },
      '404': {
        description: 'User not found',
      },
    },

    controller: async (req, res) => {
      const { id } = req.params;
      const data = await userService.update(id, req.body);

      res.json({
        message: 'User updated successfully',
        data,
      });
    },
  });

export default userRouter;
