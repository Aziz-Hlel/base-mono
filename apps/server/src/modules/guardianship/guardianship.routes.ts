import { route } from '@/openapi/routeBuilder';
import { createGuardianshipReqSchema } from '@base-monorepo-v2/contracts/schemas/guardianship/create-guardianship.req';
import { guardianshipIdParamSchema } from '@base-monorepo-v2/contracts/schemas/guardianship/get-guardianship-params.req';
import { guardianshipResSchema } from '@base-monorepo-v2/contracts/schemas/guardianship/guardianship.res';
import { updateGuardianshipReqSchema } from '@base-monorepo-v2/contracts/schemas/guardianship/update-guardianship.req';
import allAdminRoles from '@base-monorepo-v2/contracts/utils/roles/all-admin-roles';
import express from 'express';
import { guardianshipService } from './guardianship.service';

const guardianshipRouter = express.Router();

// POST /api/guardianships
route()
  .router(guardianshipRouter)
  .method('post')
  .path('/')
  .openapiPath('/api/guardianships')
  .operationId('createGuardianship')
  .summary('Request guardianship with a patient')
  .description(
    'The current guardian requests to link with a patient identified by email. The guardianship is created with PENDING status.',
  )
  .tags('Guardianships')
  .define({
    userRoles: [],
    auth: true,
    validate: {
      body: createGuardianshipReqSchema,
    },
    response: guardianshipResSchema,
    responses: {
      '201': {
        description: 'Guardianship request sent successfully',
        schema: guardianshipResSchema,
      },
      '404': {
        description: 'Guardian or patient not found',
      },
      '409': {
        description: 'A guardianship request already exists or guardian is already linked',
      },
    },

    controller: async (req, res) => {
      const data = await guardianshipService.create(req.user.id, req.body);

      res.status(201).json({
        message: 'Guardianship request sent successfully',
        data,
      });
    },
  });

// PUT /api/guardianships/:id
route()
  .router(guardianshipRouter)
  .method('put')
  .path('/:id')
  .openapiPath('/api/guardianships/{id}')
  .operationId('updateGuardianship')
  .summary('Update guardianship')
  .description('Update relationship and permissions of a guardianship.')
  .tags('Guardianships')
  .define({
    userRoles: allAdminRoles,
    auth: true,
    validate: {
      params: guardianshipIdParamSchema,
      body: updateGuardianshipReqSchema,
    },
    response: guardianshipResSchema,
    responses: {
      '200': {
        description: 'Guardianship updated successfully',
        schema: guardianshipResSchema,
      },
      '404': {
        description: 'Guardianship not found',
      },
    },

    controller: async (req, res) => {
      const { id } = req.params;
      const data = await guardianshipService.update(id, req.body);

      res.json({
        message: 'Guardianship updated successfully',
        data,
      });
    },
  });

export default guardianshipRouter;
