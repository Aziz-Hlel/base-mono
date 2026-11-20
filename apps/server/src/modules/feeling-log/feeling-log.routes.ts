import { ForbiddenException } from '@/exceptions';
import isPatient from '@/middlewares/app/isPatient';
import { route } from '@/openapi/routeBuilder';
import { createFeelingLogReqSchema } from '@base-monorepo-v2/contracts/schemas/feeling-log/create-feeling-log.req';
import { feelingLogResSchema } from '@base-monorepo-v2/contracts/schemas/feeling-log/feeling-log.res';
import { feelingLogIdParamSchema } from '@base-monorepo-v2/contracts/schemas/feeling-log/get-feeling-log-params.req';
import { updateFeelingLogReqSchema } from '@base-monorepo-v2/contracts/schemas/feeling-log/update-feeling-log.req';
import { cursorQueryParamsSchema } from '@base-monorepo-v2/contracts/types/Cursor';
import allAdminRoles from '@base-monorepo-v2/contracts/utils/roles/all-admin-roles';
import express from 'express';
import { feelingLogService } from './feeling-log.service';
import canReadPatientFeelingLogs from '@/middlewares/app/canReadPatientFeelingLogs';
import { listFeelingLogParamsSchema } from '@base-monorepo-v2/contracts/schemas/feeling-log/list-feeling-log-params.req';

const feelingLogRouter = express.Router({ mergeParams: true });

// GET /api/feeling-logs
route()
  .router(feelingLogRouter)
  .method('get')
  .path('/')
  .openapiPath('/api/patients/{patientId}/feeling-logs')
  .operationId('listMyFeelingLogs')
  .summary('List my feeling logs')
  .description(
    'Get the current patient feeling logs, newest first, with cursor pagination. Only patients can access it.',
  )
  .tags('Feeling Logs')
  .define({
    userRoles: [],
    middlewares: [canReadPatientFeelingLogs('patientId')],
    auth: true,
    validate: {
      query: cursorQueryParamsSchema,
      params: listFeelingLogParamsSchema,
    },
    response: feelingLogResSchema,
    responses: {
      '200': {
        description: 'Feeling logs fetched successfully',
        schema: feelingLogResSchema,
      },
      '403': {
        description: 'Current user is not a patient',
      },
    },

    controller: async (req, res) => {
      const patientId = req.params.patientId;
      const cursorData = await feelingLogService.listByCursor(patientId, req.query);

      res.json({
        message: 'Feeling logs fetched successfully',
        ...cursorData,
      });
    },
  });

// POST /api/feeling-logs
route()
  .router(feelingLogRouter)
  .method('post')
  .path('/')
  .openapiPath('/api/patients/{patientId}/feeling-logs')
  .operationId('createFeelingLog')
  .summary('Log how I feel')
  .description(
    'The current patient logs their daily comfort indicators and symptoms. Only patients can perform this action.',
  )
  .tags('Feeling Logs')
  .define({
    userRoles: [],
    middlewares: [isPatient],
    auth: true,
    validate: {
      body: createFeelingLogReqSchema,
    },
    response: feelingLogResSchema,
    responses: {
      '201': {
        description: 'Feeling log created successfully',
        schema: feelingLogResSchema,
      },
      '403': {
        description: 'Current user is not a patient',
      },
    },

    controller: async (req, res) => {
      const data = await feelingLogService.create(req.user.id, req.body);

      res.status(201).json({
        message: 'Feeling log created successfully',
        data,
      });
    },
  });

// GET /api/feeling-logs/:id
route()
  .router(feelingLogRouter)
  .method('get')
  .path('/:id')
  .openapiPath('/api/patients/{patientId}/feeling-logs/{id}')
  .operationId('getFeelingLogById')
  .summary('Get feeling log by ID')
  .description(
    'Retrieve a specific feeling log by ID. Only the patient who owns it or an admin can access it.',
  )
  .tags('Feeling Logs')
  .define({
    userRoles: [],
    auth: true,
    validate: {
      params: feelingLogIdParamSchema,
    },
    response: feelingLogResSchema,
    responses: {
      '200': {
        description: 'Feeling log fetched successfully',
        schema: feelingLogResSchema,
      },
      '403': {
        description: 'Current user is not the owner of this feeling log or an admin',
      },
      '404': {
        description: 'Feeling log not found',
      },
    },

    controller: async (req, res) => {
      const { id } = req.params;
      const data = await feelingLogService.getById(id);

      const isAdmin = allAdminRoles.some((role) => role === req.user.role);

      if (!isAdmin && req.user.id !== data.patientId) {
        throw new ForbiddenException('You can only view your own feeling logs');
      }

      res.json({
        message: 'Feeling log fetched successfully',
        data,
      });
    },
  });

// PUT /api/feeling-logs/:id
route()
  .router(feelingLogRouter)
  .method('put')
  .path('/:id')
  .openapiPath('/api/patients/{patientId}/feeling-logs/{id}')
  .operationId('updateFeelingLog')
  .summary('Update feeling log')
  .description('The current patient updates one of their own feeling logs.')
  .tags('Feeling Logs')
  .define({
    userRoles: [],
    middlewares: [isPatient],
    auth: true,
    validate: {
      params: feelingLogIdParamSchema,
      body: updateFeelingLogReqSchema,
    },
    response: feelingLogResSchema,
    responses: {
      '200': {
        description: 'Feeling log updated successfully',
        schema: feelingLogResSchema,
      },
      '403': {
        description: 'Current user is not a patient or does not own this feeling log',
      },
      '404': {
        description: 'Feeling log not found',
      },
    },

    controller: async (req, res) => {
      const { id } = req.params;
      const data = await feelingLogService.update(id, req.user.id, req.body);

      res.json({
        message: 'Feeling log updated successfully',
        data,
      });
    },
  });

export default feelingLogRouter;
