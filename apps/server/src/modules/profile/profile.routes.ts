import { route } from '@/openapi/routeBuilder';
import { createProfileReqSchema } from '@base-monorepo-v2/contracts/schemas/profile/create-profile.req';
import { profileResSchema } from '@base-monorepo-v2/contracts/schemas/profile/profile.res';
import { updateProfileReqSchema } from '@base-monorepo-v2/contracts/schemas/profile/update-profile.req';
import express from 'express';
import { profileService } from './profile.service';

const profileRouter = express.Router();

route()
  .router(profileRouter)
  .method('put')
  .description('')
  .openapiPath('profile/me')
  .operationId('updateMyProfile')
  .path('/me')
  .summary('update my profile')
  .tags('profile', 'me')
  .define({
    userRoles: [],
    auth: true,
    validate: {
      body: updateProfileReqSchema,
    },
    response: profileResSchema,
    responses: {
      '200': {
        description: 'Profile updated successfully',
        schema: profileResSchema,
      },
    },

    controller: async (req, res) => {
      const user = req.user;
      const data = await profileService.updateMe(user, req.body);

      res.json({
        message: 'Profile updated successfully',
        data,
      });
    },
  });

route()
  .router(profileRouter)
  .method('post')
  .description('')
  .openapiPath('profile/me')
  .operationId('createMyProfile')
  .path('/me')
  .summary('create my profile')
  .tags('profile', 'me')
  .define({
    userRoles: [],
    auth: true,
    validate: {
      body: createProfileReqSchema,
    },
    response: profileResSchema,
    responses: {
      '200': {
        description: 'Profile created successfully',
        schema: profileResSchema,
      },
    },

    controller: async (req, res) => {
      const user = req.user;
      const data = await profileService.createMe(user, req.body);

      res.json({
        message: 'Profile created successfully',
        data,
      });
    },
  });

export default profileRouter;
