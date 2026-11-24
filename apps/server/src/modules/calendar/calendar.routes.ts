import { ForbiddenException } from '@/exceptions';
import { route } from '@/openapi/routeBuilder';
import { calendarPatientParamsSchema } from '@base-monorepo-v2/contracts/schemas/calendar/calendar-patient-params.req';
import { calendarResSchema } from '@base-monorepo-v2/contracts/schemas/calendar/calendar.res';
import { createCalendarReqSchema } from '@base-monorepo-v2/contracts/schemas/calendar/create-calendar.req';
import { calendarIdParamSchema } from '@base-monorepo-v2/contracts/schemas/calendar/get-calendar-params.req';
import { listCalendarQuerySchema } from '@base-monorepo-v2/contracts/schemas/calendar/list-calendar-query.req';
import { listCalendarResSchema } from '@base-monorepo-v2/contracts/schemas/calendar/list-calendar.res';
import { updateCalendarReqSchema } from '@base-monorepo-v2/contracts/schemas/calendar/update-calendar.req';
import express from 'express';
import { calendarService } from './calendar.service';
import canManagePatientCalendar from './middlewares/canManagePatientCalendar';

const calendarRouter = express.Router({ mergeParams: true });

// GET /api/patients/:patientId/calendars
route()
  .router(calendarRouter)
  .method('get')
  .path('/')
  .openapiPath('/api/patients/{patientId}/calendars')
  .operationId('listCalendars')
  .summary('List calendar events')
  .description(
    'List the calendar events of a patient starting between startDate and endDate, ordered by start date. Defaults to today when no interval is given. Allowed for the patient, a guardian with appointment permission, or an admin.',
  )
  .tags('Calendars')
  .define({
    userRoles: [],
    middlewares: [canManagePatientCalendar('patientId')],
    auth: true,
    validate: {
      params: calendarPatientParamsSchema,
      query: listCalendarQuerySchema,
    },
    response: listCalendarResSchema,
    responses: {
      '200': {
        description: 'Calendar events fetched successfully',
        schema: listCalendarResSchema,
      },
      '403': {
        description: 'Current user cannot access this patient calendar',
      },
    },

    controller: async (req, res) => {
      const { patientId } = req.params;
      const data = await calendarService.list(patientId, req.query);

      res.json({
        message: 'Calendar events fetched successfully',
        data,
      });
    },
  });

// POST /api/patients/:patientId/calendars
route()
  .router(calendarRouter)
  .method('post')
  .path('/')
  .openapiPath('/api/patients/{patientId}/calendars')
  .operationId('createCalendar')
  .summary('Create calendar event')
  .description(
    'Create a calendar event for a patient. Allowed for the patient, a guardian with appointment management permission, or an admin.',
  )
  .tags('Calendars')
  .define({
    userRoles: [],
    middlewares: [canManagePatientCalendar('patientId')],
    auth: true,
    validate: {
      params: calendarPatientParamsSchema,
      body: createCalendarReqSchema,
    },
    response: calendarResSchema,
    responses: {
      '201': {
        description: 'Calendar event created successfully',
        schema: calendarResSchema,
      },
      '403': {
        description: 'Current user cannot manage this patient calendar',
      },
    },

    controller: async (req, res) => {
      const { patientId } = req.params;
      const data = await calendarService.create(patientId, req.body);

      res.status(201).json({
        message: 'Calendar event created successfully',
        data,
      });
    },
  });

// GET /api/patients/:patientId/calendars/:id
route()
  .router(calendarRouter)
  .method('get')
  .path('/:id')
  .openapiPath('/api/patients/{patientId}/calendars/{id}')
  .operationId('getCalendarById')
  .summary('Get calendar event by ID')
  .description(
    'Retrieve a calendar event of a patient. Allowed for the patient, a guardian with appointment permission, or an admin.',
  )
  .tags('Calendars')
  .define({
    userRoles: [],
    middlewares: [canManagePatientCalendar('patientId')],
    auth: true,
    validate: {
      params: calendarIdParamSchema,
    },
    response: calendarResSchema,
    responses: {
      '200': {
        description: 'Calendar event fetched successfully',
        schema: calendarResSchema,
      },
      '403': {
        description: 'Current user cannot access this patient calendar',
      },
      '404': {
        description: 'Calendar event not found',
      },
    },

    controller: async (req, res) => {
      const { patientId, id } = req.params;
      const data = await calendarService.getById(id, patientId);

      res.json({
        message: 'Calendar event fetched successfully',
        data,
      });
    },
  });

// PUT /api/patients/:patientId/calendars/:id
route()
  .router(calendarRouter)
  .method('put')
  .path('/:id')
  .openapiPath('/api/patients/{patientId}/calendars/{id}')
  .operationId('updateCalendar')
  .summary('Update calendar event')
  .description('The current patient updates one of their own calendar events.')
  .tags('Calendars')
  .define({
    userRoles: [],
    middlewares: [],
    auth: true,
    validate: {
      params: calendarIdParamSchema,
      body: updateCalendarReqSchema,
    },
    response: calendarResSchema,
    responses: {
      '200': {
        description: 'Calendar event updated successfully',
        schema: calendarResSchema,
      },
      '403': {
        description: 'Current user is not a patient or does not own this calendar',
      },
      '404': {
        description: 'Calendar event not found',
      },
    },

    controller: async (req, res) => {
      const { patientId, id } = req.params;

      if (req.user.id !== patientId) {
        throw new ForbiddenException('You can only update your own calendar events');
      }

      const data = await calendarService.update(id, patientId, req.body);

      res.json({
        message: 'Calendar event updated successfully',
        data,
      });
    },
  });

export default calendarRouter;
