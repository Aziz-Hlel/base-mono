import { ForbiddenException } from '@/exceptions';
import { route } from '@/openapi/routeBuilder';
import { guardianIdParamSchema } from '@base-monorepo-v2/contracts/schemas/guardian/get-guardian-params.req';
import { guardianQueryParams } from '@base-monorepo-v2/contracts/schemas/guardian/get-guardians-query-params.req';
import { guardianMinimalWithPatientsResSchema } from '@base-monorepo-v2/contracts/schemas/guardian/guardian-minimal-with-patients.res';
import { guardianResSchema } from '@base-monorepo-v2/contracts/schemas/guardian/guardian.res';
import { linkPatientGuardianReqSchema } from '@base-monorepo-v2/contracts/schemas/guardian/link-patient-guardian.req';
import { listGuardianPatientsResSchema } from '@base-monorepo-v2/contracts/schemas/guardian/list-guardian-patients.res';
import { updateGuardianReqSchema } from '@base-monorepo-v2/contracts/schemas/guardian/update-guardian.req';
import { guardianshipResSchema } from '@base-monorepo-v2/contracts/schemas/guardianship/guardianship.res';
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
    response: guardianMinimalWithPatientsResSchema,
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

// GET /api/guardians/:id/patients
route()
  .router(guardianRouter)
  .method('get')
  .path('/:id/patients')
  .openapiPath('/api/guardians/{id}/patients')
  .operationId('listGuardianPatients')
  .summary('List guardian patients')
  .description(
    'Retrieve all patients linked to a guardian with minimal info. Only the guardian themselves or an admin can access it.',
  )
  .tags('Guardians')
  .define({
    userRoles: [],
    auth: true,
    validate: {
      params: guardianIdParamSchema,
    },
    response: listGuardianPatientsResSchema,
    responses: {
      '200': {
        description: 'Guardian patients fetched successfully',
        schema: listGuardianPatientsResSchema,
      },
      '403': {
        description: 'Current user is not this guardian or an admin',
      },
      '404': {
        description: 'Guardian not found',
      },
    },

    controller: async (req, res) => {
      const { id } = req.params;

      const isAdmin = allAdminRoles.some((role) => role === req.user.role);

      if (!isAdmin && req.user.id !== id) throw new ForbiddenException();

      const data = await guardianService.listPatients(id);

      res.json({
        message: 'Guardian patients fetched successfully',
        data,
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

// POST /api/guardians/:id/guardianships/link
route()
  .router(guardianRouter)
  .method('post')
  .path('/:id/guardianships/link')
  .openapiPath('/api/guardians/{id}/guardianships/link')
  .operationId('linkPatientGuardian')
  .summary('Link patient with guardian (admin)')
  .description(
    'Admin-only: creates a PENDING guardianship between the guardian and the patient identified by email. Fails if the relation already exists.',
  )
  .tags('Guardians')
  .define({
    userRoles: allAdminRoles,
    auth: true,
    validate: {
      params: guardianIdParamSchema,
      body: linkPatientGuardianReqSchema,
    },
    response: guardianshipResSchema,
    responses: {
      '201': {
        description: 'Patient linked with guardian successfully',
        schema: guardianshipResSchema,
      },
      '404': {
        description: 'Guardian or patient not found',
      },
      '409': {
        description: 'Guardianship between this guardian and patient already exists',
      },
    },

    controller: async (req, res) => {
      const { id } = req.params;
      const data = await guardianService.linkPatient(id, req.body);

      res.status(201).json({
        message: 'Patient linked with guardian successfully',
        data,
      });
    },
  });

export default guardianRouter;
