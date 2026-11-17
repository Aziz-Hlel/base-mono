import { route } from '@/openapi/routeBuilder';
import { guardianIdParamSchema } from '@base-monorepo-v2/contracts/schemas/guardian/get-guardian-params.req';
import { guardianQueryParams } from '@base-monorepo-v2/contracts/schemas/guardian/get-guardians-query-params.req';
import { guardianMinimalResSchema } from '@base-monorepo-v2/contracts/schemas/guardian/guardian-minimal.res';
import { guardianPatientResSchema } from '@base-monorepo-v2/contracts/schemas/guardian/guardian-patient.res';
import { guardianResSchema } from '@base-monorepo-v2/contracts/schemas/guardian/guardian.res';
import { requestGuardianPatientLinkReqSchema } from '@base-monorepo-v2/contracts/schemas/guardian/request-guardian-patient-link.req';
import {
  updateGuardianPatientParamsSchema,
  updateGuardianPatientReqSchema,
} from '@base-monorepo-v2/contracts/schemas/guardian/update-guardian-patient.req';
import { updateGuardianReqSchema } from '@base-monorepo-v2/contracts/schemas/guardian/update-guardian.req';
import allAdminRoles from '@base-monorepo-v2/contracts/utils/roles/all-admin-roles';
import express from 'express';
import { guardianService } from './guardian.service';

const guardianRouter = express.Router();

// GET /api/guardians
route()
  .router(guardianRouter)
  .method('get')
  .path('/')
  .openapiPath('/api/guardians')
  .operationId('listGuardians')
  .summary('List all guardians')
  .description('Get all guardians with pagination and optional search.')
  .tags('Guardians')
  .define({
    userRoles: allAdminRoles,
    auth: true,
    validate: {
      query: guardianQueryParams.schema,
    },
    response: guardianMinimalResSchema,
    responses: {
      '200': {
        description: 'Guardians fetched successfully',
        schema: guardianResSchema,
      },
    },

    controller: async (req, res) => {
      const queryParams = req.query;
      const paginatedData = await guardianService.listAll(queryParams);

      res.json({
        message: 'Guardians fetched successfully',
        ...paginatedData,
      });
    },
  });

// GET /api/guardians/:id
route()
  .router(guardianRouter)
  .method('get')
  .path('/:id')
  .openapiPath('/api/guardians/{id}')
  .operationId('getGuardianById')
  .summary('Get guardian by ID')
  .description('Retrieve detailed information for a specific guardian by ID.')
  .tags('Guardians')
  .define({
    userRoles: allAdminRoles,
    auth: true,
    validate: {
      params: guardianIdParamSchema,
    },
    response: guardianResSchema,
    responses: {
      '200': {
        description: 'Guardian fetched successfully',
        schema: guardianResSchema,
      },
      '404': {
        description: 'Guardian not found',
      },
    },

    controller: async (req, res) => {
      const { id } = req.params;
      const guardian = await guardianService.getById(id);

      res.json({
        message: 'Guardian fetched successfully',
        data: guardian,
      });
    },
  });

// POST /api/guardians
route()
  .router(guardianRouter)
  .method('post')
  .path('/')
  .openapiPath('/api/guardians')
  .operationId('createGuardian')
  .summary('Create guardian')
  .description(
    'Create a guardian record for the current user and update their profile role to GUARDIAN.',
  )
  .tags('Guardians')
  .define({
    userRoles: [],
    auth: true,
    validate: {},
    response: guardianResSchema,
    responses: {
      '201': {
        description: 'Guardian created successfully',
        schema: guardianResSchema,
      },
      '409': {
        description: 'Guardian role already exists',
      },
    },

    controller: async (req, res) => {
      const data = await guardianService.create(req.user.id);

      res.status(201).json({
        message: 'Guardian created successfully',
        data,
      });
    },
  });

// POST /api/guardians/patient-links
route()
  .router(guardianRouter)
  .method('post')
  .path('/patient-links')
  .openapiPath('/api/guardians/patient-links')
  .operationId('requestGuardianPatientLink')
  .summary('Request link with a patient')
  .description(
    'The current guardian requests to link with a patient identified by email. The link is created with PENDING status.',
  )
  .tags('Guardians')
  .define({
    userRoles: [],
    auth: true,
    validate: {
      body: requestGuardianPatientLinkReqSchema,
    },
    response: guardianPatientResSchema,
    responses: {
      '201': {
        description: 'Link request sent successfully',
        schema: guardianPatientResSchema,
      },
      '404': {
        description: 'Guardian or patient not found',
      },
      '409': {
        description: 'A link request already exists or guardian is already linked',
      },
    },

    controller: async (req, res) => {
      const data = await guardianService.requestPatientLink(req.user.id, req.body);

      res.status(201).json({
        message: 'Link request sent successfully',
        data,
      });
    },
  });

// PUT /api/guardians/:id
route()
  .router(guardianRouter)
  .method('put')
  .path('/:id')
  .openapiPath('/api/guardians/{id}')
  .operationId('updateGuardian')
  .summary('Update guardian')
  .description('Update guardian profile and user account by ID.')
  .tags('Guardians')
  .define({
    userRoles: allAdminRoles,
    auth: true,
    validate: {
      params: guardianIdParamSchema,
      body: updateGuardianReqSchema,
    },
    response: guardianResSchema,
    responses: {
      '200': {
        description: 'Guardian updated successfully',
        schema: guardianResSchema,
      },
      '404': {
        description: 'Guardian not found',
      },
    },

    controller: async (req, res) => {
      const { id } = req.params;
      const data = await guardianService.update(id, req.body);

      res.json({
        message: 'Guardian updated successfully',
        data,
      });
    },
  });

// PUT /api/guardians/:guardianId/patients/:patientId
route()
  .router(guardianRouter)
  .method('put')
  .path('/:guardianId/patients/:patientId')
  .openapiPath('/api/guardians/{guardianId}/patients/{patientId}')
  .operationId('updateGuardianPatient')
  .summary('Update guardian patient relationship')
  .description('Update relationship and permissions between a guardian and a patient.')
  .tags('Guardians')
  .define({
    userRoles: allAdminRoles,
    auth: true,
    validate: {
      params: updateGuardianPatientParamsSchema,
      body: updateGuardianPatientReqSchema,
    },
    response: guardianPatientResSchema,
    responses: {
      '200': {
        description: 'Guardian patient relationship updated successfully',
        schema: guardianPatientResSchema,
      },
      '404': {
        description: 'Guardian-patient relationship not found',
      },
    },

    controller: async (req, res) => {
      const { guardianId, patientId } = req.params;
      const data = await guardianService.updateGuardianPatient(guardianId, patientId, req.body);

      res.json({
        message: 'Guardian patient relationship updated successfully',
        data,
      });
    },
  });

export default guardianRouter;
