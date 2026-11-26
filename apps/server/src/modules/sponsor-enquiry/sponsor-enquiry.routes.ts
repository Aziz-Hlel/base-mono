import { route } from '@/openapi/routeBuilder';
import { createSponsorEnquiryReqSchema } from '@excellense/contracts/schemas/sponsor-enquiry/create-sponsor-enquiry.req';
import { sponsorEnquiryQueryParams } from '@excellense/contracts/schemas/sponsor-enquiry/get-sponsor-enquiries-query-params.req';
import { listSponsorEnquiriesResSchema } from '@excellense/contracts/schemas/sponsor-enquiry/list-sponsor-enquiries.res';
import { sponsorEnquiryResSchema } from '@excellense/contracts/schemas/sponsor-enquiry/sponsor-enquiry.res';
import allAdminRoles from '@excellense/contracts/utils/roles/all-admin-roles';
import express from 'express';
import { sponsorEnquiryService } from './sponsor-enquiry.service';

const sponsorEnquiryRouter = express.Router();

// GET /api/sponsor-enquiries
route()
  .router(sponsorEnquiryRouter)
  .method('get')
  .path('/')
  .openapiPath('/api/sponsor-enquiries')
  .operationId('listSponsorEnquiries')
  .summary('List all sponsor enquiries')
  .description('Get all sponsor enquiries with pagination and optional search.')
  .tags('Sponsor Enquiries')
  .define({
    userRoles: allAdminRoles,
    auth: true,
    validate: {
      query: sponsorEnquiryQueryParams.schema,
    },
    response: listSponsorEnquiriesResSchema,
    responses: {
      '200': {
        description: 'Sponsor enquiries fetched successfully',
        schema: listSponsorEnquiriesResSchema,
      },
    },

    controller: async (req, res) => {
      const paginatedData = await sponsorEnquiryService.listAll(req.query);

      res.json({
        message: 'Sponsor enquiries fetched successfully',
        ...paginatedData,
      });
    },
  });

// POST /api/sponsor-enquiries
route()
  .router(sponsorEnquiryRouter)
  .method('post')
  .path('/')
  .openapiPath('/api/sponsor-enquiries')
  .operationId('createSponsorEnquiry')
  .summary('Submit a sponsor enquiry')
  .description('Create a new sponsor enquiry.')
  .tags('Sponsor Enquiries')
  .define({
    userRoles: [],
    auth: false,
    validate: {
      body: createSponsorEnquiryReqSchema,
    },
    response: sponsorEnquiryResSchema,
    responses: {
      '201': {
        description: 'Sponsor enquiry submitted successfully',
        schema: sponsorEnquiryResSchema,
      },
    },

    controller: async (req, res) => {
      const data = await sponsorEnquiryService.create(req.body);

      res.status(201).json({
        message: 'Sponsor enquiry submitted successfully',
        data,
      });
    },
  });

export default sponsorEnquiryRouter;
