import isProfileOwner from '@/middlewares/app/isProfileOwner';
import { route } from '@/openapi/routeBuilder';
import { createDiaryNoteReqSchema } from '@base-monorepo-v2/contracts/schemas/diary-note/create-diary-note.req';
import { diaryNoteResSchema } from '@base-monorepo-v2/contracts/schemas/diary-note/diary-note.res';
import { diaryNoteIdParamSchema } from '@base-monorepo-v2/contracts/schemas/diary-note/get-diary-note-params.req';
import { listDiaryNoteParamsSchema } from '@base-monorepo-v2/contracts/schemas/diary-note/list-diary-note-params.req';
import { updateDiaryNoteReqSchema } from '@base-monorepo-v2/contracts/schemas/diary-note/update-diary-note.req';
import { cursorQueryParamsSchema } from '@base-monorepo-v2/contracts/types/Cursor';
import express from 'express';
import { diaryNoteService } from './diary-note.service';
import canReadDiaryNotes from '@/middlewares/app/canReadDiaryNotes';

const diaryNoteRouter = express.Router({ mergeParams: true });

// GET /api/profiles/:profileId/diary-notes
route()
  .router(diaryNoteRouter)
  .method('get')
  .path('/')
  .openapiPath('/api/profiles/{profileId}/diary-notes')
  .operationId('listDiaryNotes')
  .summary('List diary notes')
  .description(
    'Get the diary notes of a profile, newest first, with cursor pagination. Only the profile owner can access them.',
  )
  .tags('Diary Notes')
  .define({
    userRoles: [],
    middlewares: [canReadDiaryNotes('profileId')],
    auth: true,
    validate: {
      query: cursorQueryParamsSchema,
      params: listDiaryNoteParamsSchema,
    },
    response: diaryNoteResSchema,
    responses: {
      '200': {
        description: 'Diary notes fetched successfully',
        schema: diaryNoteResSchema,
      },
      '403': {
        description: 'Current user is not the owner of this profile',
      },
    },

    controller: async (req, res) => {
      const { profileId } = req.params;
      const cursorData = await diaryNoteService.listByCursor(profileId, req.query);

      res.json({
        message: 'Diary notes fetched successfully',
        ...cursorData,
      });
    },
  });

// POST /api/profiles/:profileId/diary-notes
route()
  .router(diaryNoteRouter)
  .method('post')
  .path('/')
  .openapiPath('/api/profiles/{profileId}/diary-notes')
  .operationId('createDiaryNote')
  .summary('Create diary note')
  .description('The profile owner creates a diary note, optionally with attached media.')
  .tags('Diary Notes')
  .define({
    userRoles: [],
    middlewares: [isProfileOwner('profileId')],
    auth: true,
    validate: {
      params: listDiaryNoteParamsSchema,
      body: createDiaryNoteReqSchema,
    },
    response: diaryNoteResSchema,
    responses: {
      '201': {
        description: 'Diary note created successfully',
        schema: diaryNoteResSchema,
      },
      '400': {
        description: 'One or more media items do not exist',
      },
      '403': {
        description: 'Current user is not the owner of this profile',
      },
    },

    controller: async (req, res) => {
      const { profileId } = req.params;
      const data = await diaryNoteService.create(profileId, req.body);

      res.status(201).json({
        message: 'Diary note created successfully',
        data,
      });
    },
  });

// GET /api/profiles/:profileId/diary-notes/:id
route()
  .router(diaryNoteRouter)
  .method('get')
  .path('/:id')
  .openapiPath('/api/profiles/{profileId}/diary-notes/{id}')
  .operationId('getDiaryNoteById')
  .summary('Get diary note by ID')
  .description('Retrieve a specific diary note by ID. Only the profile owner can access it.')
  .tags('Diary Notes')
  .define({
    userRoles: [],
    middlewares: [isProfileOwner('profileId')],
    auth: true,
    validate: {
      params: diaryNoteIdParamSchema,
    },
    response: diaryNoteResSchema,
    responses: {
      '200': {
        description: 'Diary note fetched successfully',
        schema: diaryNoteResSchema,
      },
      '403': {
        description: 'Current user is not the owner of this profile',
      },
      '404': {
        description: 'Diary note not found',
      },
    },

    controller: async (req, res) => {
      const { id, profileId } = req.params;
      const data = await diaryNoteService.getById(id, profileId);

      res.json({
        message: 'Diary note fetched successfully',
        data,
      });
    },
  });

// PUT /api/profiles/:profileId/diary-notes/:id
route()
  .router(diaryNoteRouter)
  .method('put')
  .path('/:id')
  .openapiPath('/api/profiles/{profileId}/diary-notes/{id}')
  .operationId('updateDiaryNote')
  .summary('Update diary note')
  .description(
    'The profile owner updates one of their diary notes. The media list replaces the existing one.',
  )
  .tags('Diary Notes')
  .define({
    userRoles: [],
    middlewares: [isProfileOwner('profileId')],
    auth: true,
    validate: {
      params: diaryNoteIdParamSchema,
      body: updateDiaryNoteReqSchema,
    },
    response: diaryNoteResSchema,
    responses: {
      '200': {
        description: 'Diary note updated successfully',
        schema: diaryNoteResSchema,
      },
      '400': {
        description: 'One or more media items do not exist',
      },
      '403': {
        description: 'Current user is not the owner of this profile',
      },
      '404': {
        description: 'Diary note not found',
      },
    },

    controller: async (req, res) => {
      const { id, profileId } = req.params;
      const data = await diaryNoteService.update(id, profileId, req.body);

      res.json({
        message: 'Diary note updated successfully',
        data,
      });
    },
  });

export default diaryNoteRouter;
