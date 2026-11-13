import { route } from '@/openapi/routeBuilder';
import { guardianQueryParams } from '@base-monorepo-v2/contracts/schemas/guardian/get-guardians-query-params.req';
import { guardianResSchema } from '@base-monorepo-v2/contracts/schemas/guardian/guardian.res';
import allAdminRoles from '@base-monorepo-v2/contracts/utils/roles/all-admin-roles';
import express from 'express';
import { guardianService } from './guardian.service';

const router = express.Router();
route()
  .router(router)
  .method('get')
  .path('/')
  .openapiPath('guardian/')
  .operationId('getGuardianPage')
  .summary('my profile')
  .description('')
  .tags('guardian', 'page')
  .define({
    userRoles: allAdminRoles,
    auth: true,
    validate: {
      query: guardianQueryParams.schema,
    },
    response: guardianResSchema,

    controller: async (req, res) => {
      const queryParams = req.query;
      const data = await guardianService.getGuardians(queryParams);

      res.json({
        message: 'Guardians fetched successfully',
        data,
      });
    },
    responses: {
      '200': {
        description: 'Guardians fetched successfully',
        schema: guardianResSchema,
      },
    },
  });
