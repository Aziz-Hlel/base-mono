import { route } from '@/openapi/routeBuilder';
import { doctorDetailedResSchema } from '@base-monorepo-v2/contracts/schemas/doctor/doctor-detailed.res';
import { doctorMinimalResSchema } from '@base-monorepo-v2/contracts/schemas/doctor/doctor-minimal.res';
import { doctorIdParamSchema } from '@base-monorepo-v2/contracts/schemas/doctor/get-doctor-params.req';
import { doctorQueryParams } from '@base-monorepo-v2/contracts/schemas/doctor/get-doctors-query-params.req';
import { listDoctorResSchema } from '@base-monorepo-v2/contracts/schemas/doctor/list-doctor.res';
import { updateDoctorReqSchema } from '@base-monorepo-v2/contracts/schemas/doctor/update-doctor.req';
import allAdminRoles from '@base-monorepo-v2/contracts/utils/roles/all-admin-roles';
import express from 'express';
import { doctorService } from './doctor.service';

const doctorRouter = express.Router();

// GET /api/doctors
route()
  .router(doctorRouter)
  .method('get')
  .path('/')
  .openapiPath('/api/doctors')
  .operationId('listDoctors')
  .summary('List doctors')
  .description('Retrieve a paginated list of doctors with optional search and filters.')
  .tags('Doctors')
  .define({
    userRoles: allAdminRoles,
    auth: true,
    validate: {
      query: doctorQueryParams.schema,
    },
    response: doctorMinimalResSchema,
    responses: {
      '200': {
        description: 'Doctors fetched successfully',
        schema: listDoctorResSchema,
      },
    },

    controller: async (req, res) => {
      const queryParams = req.query;
      const paginatedData = await doctorService.listAll(queryParams);

      res.json({
        message: 'Doctors fetched successfully',
        data: paginatedData.data,
        pagination: paginatedData.pagination,
      });
    },
  });

// GET /api/doctors/:id
route()
  .router(doctorRouter)
  .method('get')
  .path('/:id')
  .openapiPath('/api/doctors/{id}')
  .operationId('getDoctorById')
  .summary('Get doctor by ID')
  .description(
    'Retrieve detailed information for a specific doctor by ID, including user credentials and profile.',
  )
  .tags('Doctors')
  .define({
    userRoles: allAdminRoles,
    auth: true,
    validate: {
      params: doctorIdParamSchema,
    },
    response: doctorDetailedResSchema,
    responses: {
      '200': {
        description: 'Doctor fetched successfully',
        schema: doctorDetailedResSchema,
      },
      '404': {
        description: 'Doctor not found',
      },
    },

    controller: async (req, res) => {
      const { id } = req.params;
      const doctor = await doctorService.getById(id);

      res.json({
        message: 'Doctor fetched successfully',
        data: doctor,
      });
    },
  });

// PUT /api/doctors/:id
route()
  .router(doctorRouter)
  .method('put')
  .path('/:id')
  .openapiPath('/api/doctors/{id}')
  .operationId('updateDoctor')
  .summary('Update doctor')
  .description('Update doctor details by ID.')
  .tags('Doctors')
  .define({
    userRoles: allAdminRoles,
    auth: true,
    validate: {
      params: doctorIdParamSchema,
      body: updateDoctorReqSchema,
    },
    response: doctorDetailedResSchema,
    responses: {
      '200': {
        description: 'Doctor updated successfully',
        schema: doctorDetailedResSchema,
      },
    },

    controller: async (req, res) => {
      const { id } = req.params;
      const data = await doctorService.update(id, req.body);

      res.json({
        message: 'Doctor updated successfully',
        data,
      });
    },
  });

export default doctorRouter;
