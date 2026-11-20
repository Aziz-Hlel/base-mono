import prisma from '@/db';
import { ForbiddenException, NotFoundException } from '@/exceptions';
import { route } from '@/openapi/routeBuilder';
import { ERROR_CODES } from '@base-monorepo-v2/contracts/exceptions/codes';
import { createGuardianshipReqSchema } from '@base-monorepo-v2/contracts/schemas/guardianship/create-guardianship.req';
import { guardianshipIdParamSchema } from '@base-monorepo-v2/contracts/schemas/guardianship/get-guardianship-params.req';
import { guardianshipResSchema } from '@base-monorepo-v2/contracts/schemas/guardianship/guardianship.res';
import { respondGuardianshipRequestReqSchema } from '@base-monorepo-v2/contracts/schemas/guardianship/respond-guardianship-request.req';
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

// GET /api/guardianships/:id
route()
  .router(guardianshipRouter)
  .method('get')
  .path('/:id')
  .openapiPath('/api/guardianships/{id}')
  .operationId('getGuardianshipById')
  .summary('Get guardianship by ID')
  .description(
    'Retrieve a specific guardianship by ID. Only the linked patient or guardian can access it.',
  )
  .tags('Guardianships')
  .define({
    userRoles: [],
    auth: true,
    validate: {
      params: guardianshipIdParamSchema,
    },
    response: guardianshipResSchema,
    responses: {
      '200': {
        description: 'Guardianship fetched successfully',
        schema: guardianshipResSchema,
      },
      '403': {
        description: 'Not authorized to view this guardianship',
      },
      '404': {
        description: 'Guardianship not found',
      },
    },

    controller: async (req, res) => {
      const { id } = req.params;

      const data = await guardianshipService.getById(id);

      res.json({
        message: 'Guardianship fetched successfully',
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

      const body = updateGuardianshipReqSchema.parse(req.body);

      const userId = req.user.id;

      const guardianship = await prisma.guardianship.findUnique({
        where: {
          id,
        },
        select: {
          patientId: true,
        },
      });

      if (!guardianship) {
        throw new NotFoundException('Guardianship not found', {
          code: ERROR_CODES.GUARDIANSHIP.NOT_FOUND,
        });
      }

      if (guardianship.patientId !== userId) {
        throw new ForbiddenException('You are not authorized to update this guardianship', {
          code: ERROR_CODES.GLOBAL.UNAUTHORIZED,
        });
      }

      const data = await guardianshipService.update(id, body);

      res.json({
        message: 'Guardianship updated successfully',
        data,
      });
    },
  });

// PATCH /api/guardianships/:id/status
route()
  .router(guardianshipRouter)
  .method('patch')
  .path('/:id/status')
  .openapiPath('/api/guardianships/{id}/status')
  .operationId('updateGuardianshipStatus')
  .summary('Accept or reject a guardianship request')
  .description(
    'The patient accepts or rejects a pending guardianship request. Only the patient of this guardianship can perform this action.',
  )
  .tags('Guardianships')
  .define({
    userRoles: [],
    auth: true,
    validate: {
      params: guardianshipIdParamSchema,
      body: respondGuardianshipRequestReqSchema,
    },
    response: guardianshipResSchema,
    responses: {
      '200': {
        description: 'Guardianship status updated successfully',
        schema: guardianshipResSchema,
      },
      '403': {
        description: 'Current user is not the patient of this guardianship',
      },
      '404': {
        description: 'Guardianship not found',
      },
      '409': {
        description: 'Guardianship request is not pending',
      },
    },

    controller: async (req, res) => {
      const { id } = req.params;

      const userId = req.user.id;

      const guardianship = await prisma.guardianship.findUnique({
        where: {
          id,
        },
        select: {
          patientId: true,
        },
      });

      if (!guardianship) {
        throw new NotFoundException('Guardianship not found', {
          code: ERROR_CODES.GUARDIANSHIP.NOT_FOUND,
        });
      }

      if (guardianship.patientId !== userId) {
        throw new ForbiddenException('You are not authorized to update this guardianship status', {
          code: ERROR_CODES.GLOBAL.UNAUTHORIZED,
        });
      }

      const data = await guardianshipService.respondToRequest(id, req.body);

      res.json({
        message: 'Guardianship status updated successfully',
        data,
      });
    },
  });

export default guardianshipRouter;
