import { ForbiddenException } from '@/exceptions';
import { route } from '@/openapi/routeBuilder';
import { guardianshipResSchema } from '@base-monorepo-v2/contracts/schemas/guardianship/guardianship.res';
import { updateGuardianshipStatusReqSchema } from '@base-monorepo-v2/contracts/schemas/guardianship/update-guardianship-status.req';
import { createFullPatientReqSchema } from '@base-monorepo-v2/contracts/schemas/patient/create-full-patient.req';
import { createPatientReqSchema } from '@base-monorepo-v2/contracts/schemas/patient/create-patient.req';
import { patientGuardianParamsSchema } from '@base-monorepo-v2/contracts/schemas/patient/get-patient-guardian-params.req';
import { patientIdParamSchema } from '@base-monorepo-v2/contracts/schemas/patient/get-patient-params.req';
import { patientQueryParams } from '@base-monorepo-v2/contracts/schemas/patient/get-patients-query-params.req';
import { linkGuardianPatientReqSchema } from '@base-monorepo-v2/contracts/schemas/patient/link-guardian-patient.req';
import { patientDetailedResSchema } from '@base-monorepo-v2/contracts/schemas/patient/patient-detailed.res';
import { patientMinimalResSchema } from '@base-monorepo-v2/contracts/schemas/patient/patient-minimal.res';
import { updatePatientReqSchema } from '@base-monorepo-v2/contracts/schemas/patient/update-patient.req';
import allAdminRoles from '@base-monorepo-v2/contracts/utils/roles/all-admin-roles';
import express from 'express';
import { guardianshipService } from '../guardianship/guardianship.service';
import { patientService } from './patient.service';

const patientRouter = express.Router();

// GET /api/patients
route()
  .router(patientRouter)
  .method('get')
  .path('/')
  .openapiPath('/api/patients')
  .operationId('listPatients')
  .summary('List all patients')
  .description('Get all patients with pagination and optional search.')
  .tags('Patients')
  .define({
    userRoles: allAdminRoles,
    auth: true,
    validate: {
      query: patientQueryParams.schema,
    },
    response: patientMinimalResSchema,
    responses: {
      '200': {
        description: 'Patients fetched successfully',
        schema: patientMinimalResSchema,
      },
    },

    controller: async (req, res) => {
      const queryParams = req.query;
      const paginatedData = await patientService.listAll(queryParams);

      res.json({
        message: 'Patients fetched successfully',
        ...paginatedData,
      });
    },
  });

// POST /api/patients
route()
  .router(patientRouter)
  .method('post')
  .path('/')
  .openapiPath('/api/patients')
  .operationId('createPatient')
  .summary('Create patient (admin)')
  .description('Admin-only: creates a new user account, profile, and patient record in one shot.')
  .tags('Patients')
  .define({
    userRoles: allAdminRoles,
    auth: true,
    validate: {
      body: createFullPatientReqSchema,
    },
    response: patientDetailedResSchema,
    responses: {
      '201': {
        description: 'Patient created successfully',
        schema: patientDetailedResSchema,
      },
      '409': {
        description: 'Email already registered',
      },
    },

    controller: async (req, res) => {
      const data = await patientService.createFull(req.body);

      res.status(201).json({
        message: 'Patient created successfully',
        data,
      });
    },
  });

// POST /api/patients/me
route()
  .router(patientRouter)
  .method('post')
  .path('/me')
  .openapiPath('/api/patients/me')
  .operationId('createPatientMe')
  .summary('Create patient (self)')
  .description(
    'Create a patient record for the current user and update their profile role to PATIENT.',
  )
  .tags('Patients')
  .define({
    userRoles: [],
    auth: true,
    validate: {
      body: createPatientReqSchema,
    },
    response: patientDetailedResSchema,
    responses: {
      '201': {
        description: 'Patient created successfully',
        schema: patientDetailedResSchema,
      },
      '403': {
        description: 'User has an administrative role and cannot be a patient',
      },
      '404': {
        description: 'Profile not found',
      },
      '409': {
        description: 'Patient role (or another profile role) already exists',
      },
    },

    controller: async (req, res) => {
      const data = await patientService.create(req.user.id, req.body);

      res.status(201).json({
        message: 'Patient created successfully',
        data,
      });
    },
  });

// PUT /api/patients/:id
route()
  .router(patientRouter)
  .method('put')
  .path('/:id')
  .openapiPath('/api/patients/{id}')
  .operationId('updatePatient')
  .summary('Update patient')
  .description('Update patient medical and wellness information by ID.')
  .tags('Patients')
  .define({
    userRoles: allAdminRoles,
    auth: true,
    validate: {
      params: patientIdParamSchema,
      body: updatePatientReqSchema,
    },
    response: patientDetailedResSchema,
    responses: {
      '200': {
        description: 'Patient updated successfully',
        schema: patientDetailedResSchema,
      },
      '404': {
        description: 'Patient not found',
      },
    },

    controller: async (req, res) => {
      const { id } = req.params;
      const data = await patientService.update(id, req.body);

      res.json({
        message: 'Patient updated successfully',
        data,
      });
    },
  });

// PATCH /api/patients/:patientId/guardians/:guardianId/status
route()
  .router(patientRouter)
  .method('patch')
  .path('/:patientId/guardians/:guardianId/status')
  .openapiPath('/api/patients/{patientId}/guardians/{guardianId}/status')
  .operationId('updatePatientGuardianshipStatus')
  .summary('Update guardian link status')
  .description(
    'The current patient accepts or revokes a guardian link. Only the patient themself can perform this action.',
  )
  .tags('Patients')
  .define({
    userRoles: [],
    auth: true,
    validate: {
      params: patientGuardianParamsSchema,
      body: updateGuardianshipStatusReqSchema,
    },
    response: guardianshipResSchema,
    responses: {
      '200': {
        description: 'Guardian link status updated successfully',
        schema: guardianshipResSchema,
      },
      '403': {
        description: 'Current user is not the patient of this link',
      },
      '404': {
        description: 'Guardianship not found',
      },
    },

    controller: async (req, res) => {
      const { patientId, guardianId } = req.params;

      if (req.user.id !== patientId) {
        throw new ForbiddenException(
          'You can only update guardian links of your own patient account',
        );
      }

      const data = await guardianshipService.updateStatus(patientId, guardianId, req.body);

      res.json({
        message: 'Guardian link status updated successfully',
        data,
      });
    },
  });

// POST /api/patients/:id/guardian-patients/link
route()
  .router(patientRouter)
  .method('post')
  .path('/:id/guardian-patients/link')
  .openapiPath('/api/patients/{id}/guardian-patients/link')
  .operationId('linkGuardianPatient')
  .summary('Link guardian with patient (admin)')
  .description(
    'Admin-only: creates a guardianship between the patient and the guardian identified by email. Fails if the relation already exists.',
  )
  .tags('Patients')
  .define({
    userRoles: allAdminRoles,
    auth: true,
    validate: {
      params: patientIdParamSchema,
      body: linkGuardianPatientReqSchema,
    },
    response: guardianshipResSchema,
    responses: {
      '201': {
        description: 'Guardian linked with patient successfully',
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
      const data = await patientService.linkGuardian(id, req.body);

      res.status(201).json({
        message: 'Guardian linked with patient successfully',
        data,
      });
    },
  });

export default patientRouter;
