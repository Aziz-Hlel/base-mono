import { route } from '@/openapi/routeBuilder';
import { profileResSchema } from '@base-monorepo-v2/contracts/schemas/profile/profile.res';
import { updateProfileReqSchema } from '@base-monorepo-v2/contracts/schemas/profile/update-profile.req';
import express from 'express';
import { profileService } from './profile.service';

const router = express.Router();
route()
  .router(router)
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

    controller: async (req, res) => {
      const user = req.user;
      const data = await profileService.updateMe(user, req.body);

      res.json({
        message: 'Profile updated successfully',
        data,
      });
    },
    responses: {
      '200': {
        description: 'Profile updated successfully',
        schema: profileResSchema,
      },
    },
  });
