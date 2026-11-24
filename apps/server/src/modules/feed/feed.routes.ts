import isAdmin from '@/middlewares/app/utils/isAdmin';
import { route } from '@/openapi/routeBuilder';
import { createFeedReqSchema } from '@base-monorepo-v2/contracts/schemas/feed/create-feed.req';
import { feedResSchema } from '@base-monorepo-v2/contracts/schemas/feed/feed.res';
import { feedIdParamSchema } from '@base-monorepo-v2/contracts/schemas/feed/get-feed-params.req';
import { updateFeedReqSchema } from '@base-monorepo-v2/contracts/schemas/feed/update-feed.req';
import { cursorQueryParamsSchema } from '@base-monorepo-v2/contracts/types/Cursor';
import allAdminRoles from '@base-monorepo-v2/contracts/utils/roles/all-admin-roles';
import express from 'express';
import z from 'zod';
import { feedService } from './feed.service';

const feedRouter = express.Router({ mergeParams: true });

// GET /api/feeds
route()
  .router(feedRouter)
  .method('get')
  .path('/')
  .openapiPath('/api/feeds')
  .operationId('listFeeds')
  .summary('List feeds')
  .description(
    'Get approved feed posts, pinned first then newest, with cursor pagination. Each post includes its reaction counts and the current user reaction.',
  )
  .tags('Feeds')
  .define({
    userRoles: [],
    auth: true,
    validate: {
      query: cursorQueryParamsSchema,
    },
    response: feedResSchema,
    responses: {
      '200': {
        description: 'Feeds fetched successfully',
        schema: feedResSchema,
      },
    },

    controller: async (req, res) => {
      const isAdmin = allAdminRoles.some((role) => role === req.user.role);
      const cursorData = await feedService.listByCursor(req.query, {
        profileId: req.user.id,
        isAdmin,
      });

      res.json({
        message: 'Feeds fetched successfully',
        ...cursorData,
      });
    },
  });

// POST /api/feeds
route()
  .router(feedRouter)
  .method('post')
  .path('/')
  .openapiPath('/api/feeds')
  .operationId('createFeed')
  .summary('Share diary note to feed')
  .description(
    'The current user shares one of their own diary notes to the feed. The post starts as PENDING until reviewed. A diary note can only be shared once.',
  )
  .tags('Feeds')
  .define({
    userRoles: [],
    auth: true,
    validate: {
      body: createFeedReqSchema,
    },
    response: feedResSchema,
    responses: {
      '201': {
        description: 'Feed created successfully',
        schema: feedResSchema,
      },
      '404': {
        description: 'Diary note not found or not owned by the current user',
      },
      '409': {
        description: 'Diary note is already shared to the feed',
      },
    },

    controller: async (req, res) => {
      const data = await feedService.create(req.user.id, req.body);

      res.status(201).json({
        message: 'Feed created successfully',
        data,
      });
    },
  });

// GET /api/feeds/:id
route()
  .router(feedRouter)
  .method('get')
  .path('/:id')
  .openapiPath('/api/feeds/{id}')
  .operationId('getFeedById')
  .summary('Get feed by ID')
  .description(
    'Retrieve a specific feed post with its reaction counts and the current user reaction. Approved posts are visible to everyone; pending or rejected posts only to their author or an admin.',
  )
  .tags('Feeds')
  .define({
    userRoles: [],
    auth: true,
    validate: {
      params: feedIdParamSchema,
    },
    response: feedResSchema,
    responses: {
      '200': {
        description: 'Feed fetched successfully',
        schema: feedResSchema,
      },
      '404': {
        description: 'Feed not found',
      },
    },

    controller: async (req, res) => {
      const { id } = req.params;
      const isAdmin = allAdminRoles.some((role) => role === req.user.role);
      const data = await feedService.getById(id, { profileId: req.user.id, isAdmin });

      res.json({
        message: 'Feed fetched successfully',
        data,
      });
    },
  });

// PUT /api/feeds/:id
route()
  .router(feedRouter)
  .method('put')
  .path('/:id')
  .openapiPath('/api/feeds/{id}')
  .operationId('updateFeed')
  .summary('Update feed')
  .description(
    'The author can update journeyStage and relationShip. Admins can also change status and isPinned; approving a post sets approvedAt.',
  )
  .tags('Feeds')
  .define({
    userRoles: [],
    auth: true,
    validate: {
      params: feedIdParamSchema,
      body: updateFeedReqSchema,
    },
    middlewares: [isAdmin],
    response: z.null(),
    responses: {
      '200': {
        description: 'Feed updated successfully',
        schema: feedResSchema,
      },
      '403': {
        description: 'Only admins can change the status or pin a feed',
      },
      '404': {
        description: 'Feed not found or not owned by the current user',
      },
    },

    controller: async (req, res) => {
      const { id } = req.params;

      const data = await feedService.update(id, req.body);

      res.json({
        message: 'Feed updated successfully',
        data,
      });
    },
  });

// DELETE /api/feeds/:id
route()
  .router(feedRouter)
  .method('delete')
  .path('/:id')
  .openapiPath('/api/feeds/{id}')
  .operationId('deleteFeed')
  .summary('Delete feed')
  .description(
    'Admins only. Deletes a feed post and its reactions. The underlying diary note is kept.',
  )
  .tags('Feeds')
  .define({
    userRoles: [],
    auth: true,
    validate: {
      params: feedIdParamSchema,
    },
    middlewares: [isAdmin],
    response: z.null(),
    responses: {
      '204': {
        description: 'Feed deleted successfully',
      },
      '403': {
        description: 'Only admins can delete a feed',
      },
      '404': {
        description: 'Feed not found',
      },
    },

    controller: async (req, res) => {
      const { id } = req.params;

      const data = await feedService.delete(id);

      res.status(204).json({
        message: 'Feed deleted successfully',
        data,
      });
    },
  });

export default feedRouter;
