import { route } from '@/openapi/routeBuilder';
import { createExhibitorEnquiryReqSchema } from '@excellense/contracts/schemas/exhibitor-enquiry/create-exhibitor-enquiry.req';
import { exhibitorEnquiryResSchema } from '@excellense/contracts/schemas/exhibitor-enquiry/exhibitor-enquiry.res';
import { exhibitorEnquiryQueryParams } from '@excellense/contracts/schemas/exhibitor-enquiry/get-exhibitor-enquiries-query-params.req';
import { listExhibitorEnquiriesResSchema } from '@excellense/contracts/schemas/exhibitor-enquiry/list-exhibitor-enquiries.res';
import allAdminRoles from '@excellense/contracts/utils/roles/all-admin-roles';
import express from 'express';
import { exhibitorEnquiryService } from './exhibitor-enquiry.service';

const exhibitorEnquiryRouter = express.Router();

// GET /api/exhibitor-enquiries
route()
  .router(exhibitorEnquiryRouter)
  .method('get')
  .path('/')
  .openapiPath('/api/exhibitor-enquiries')
  .operationId('listExhibitorEnquiries')
  .summary('List all exhibitor enquiries')
  .description('Get all exhibitor enquiries with pagination and optional search.')
  .tags('Exhibitor Enquiries')
  .define({
    userRoles: allAdminRoles,
    auth: true,
    validate: {
      query: exhibitorEnquiryQueryParams.schema,
    },
    response: listExhibitorEnquiriesResSchema,
    responses: {
      '200': {
        description: 'Exhibitor enquiries fetched successfully',
        schema: listExhibitorEnquiriesResSchema,
      },
    },

    controller: async (req, res) => {
      const paginatedData = await exhibitorEnquiryService.listAll(req.query);

      res.json({
        message: 'Exhibitor enquiries fetched successfully',
        ...paginatedData,
      });
    },
  });

// POST /api/exhibitor-enquiries
route()
  .router(exhibitorEnquiryRouter)
  .method('post')
  .path('/')
  .openapiPath('/api/exhibitor-enquiries')
  .operationId('createExhibitorEnquiry')
  .summary('Submit an exhibitor enquiry')
  .description('Create a new exhibitor enquiry.')
  .tags('Exhibitor Enquiries')
  .define({
    userRoles: [],
    auth: false,
    validate: {
      body: createExhibitorEnquiryReqSchema,
    },
    response: exhibitorEnquiryResSchema,
    responses: {
      '201': {
        description: 'Exhibitor enquiry submitted successfully',
        schema: exhibitorEnquiryResSchema,
      },
    },

    controller: async (req, res) => {
      const data = await exhibitorEnquiryService.create(req.body);

      res.status(201).json({
        message: 'Exhibitor enquiry submitted successfully',
        data,
      });
    },
  });

export default exhibitorEnquiryRouter;
