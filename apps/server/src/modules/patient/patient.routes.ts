import { route } from '@/openapi/routeBuilder';
import { createPatientReqSchema } from '@base-monorepo-v2/contracts/schemas/patient/create-patient.req';
import { patientIdParamSchema } from '@base-monorepo-v2/contracts/schemas/patient/get-patient-params.req';
import { patientQueryParams } from '@base-monorepo-v2/contracts/schemas/patient/get-patients-query-params.req';
import { patientDetailedResSchema } from '@base-monorepo-v2/contracts/schemas/patient/patient-detailed.res';
import { patientMinimalResSchema } from '@base-monorepo-v2/contracts/schemas/patient/patient-minimal.res';
import { updatePatientReqSchema } from '@base-monorepo-v2/contracts/schemas/patient/update-patient.req';
import allAdminRoles from '@base-monorepo-v2/contracts/utils/roles/all-admin-roles';
import express from 'express';
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
  .summary('Create patient')
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

export default patientRouter;
