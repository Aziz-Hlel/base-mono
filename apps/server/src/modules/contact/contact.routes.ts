import { route } from '@/openapi/routeBuilder';
import { contactResSchema } from '@excellense/contracts/schemas/contact/contact.res';
import { createContactReqSchema } from '@excellense/contracts/schemas/contact/create-contact.req';
import { contactQueryParams } from '@excellense/contracts/schemas/contact/get-contacts-query-params.req';
import { listContactsResSchema } from '@excellense/contracts/schemas/contact/list-contacts.res';
import allAdminRoles from '@excellense/contracts/utils/roles/all-admin-roles';
import express from 'express';
import { contactService } from './contact.service';

const contactRouter = express.Router();

// GET /api/contacts
route()
  .router(contactRouter)
  .method('get')
  .path('/')
  .openapiPath('/api/contacts')
  .operationId('listContacts')
  .summary('List all contact enquiries')
  .description('Get all contact enquiries with pagination and optional search.')
  .tags('Contacts')
  .define({
    userRoles: allAdminRoles,
    auth: true,
    validate: {
      query: contactQueryParams.schema,
    },
    response: listContactsResSchema,
    responses: {
      '200': {
        description: 'Contact enquiries fetched successfully',
        schema: listContactsResSchema,
      },
    },

    controller: async (req, res) => {
      const paginatedData = await contactService.listAll(req.query);

      res.json({
        message: 'Contact enquiries fetched successfully',
        ...paginatedData,
      });
    },
  });

// POST /api/contacts
route()
  .router(contactRouter)
  .method('post')
  .path('/')
  .openapiPath('/api/contacts')
  .operationId('createContact')
  .summary('Submit a contact enquiry')
  .description('Create a new contact enquiry.')
  .tags('Contacts')
  .define({
    userRoles: [],
    auth: false,
    validate: {
      body: createContactReqSchema,
    },
    response: contactResSchema,
    responses: {
      '201': {
        description: 'Contact enquiry submitted successfully',
        schema: contactResSchema,
      },
    },

    controller: async (req, res) => {
      const data = await contactService.create(req.body);

      res.status(201).json({
        message: 'Contact enquiry submitted successfully',
        data,
      });
    },
  });

export default contactRouter;
