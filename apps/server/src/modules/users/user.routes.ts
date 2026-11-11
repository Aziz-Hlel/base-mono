import { defineRoute } from '@/openapi/defineRoute';
import { authTokenResSchema } from '@base-monorepo-v2/contracts/schemas/auth/authToken.res';
import { loginSchema } from '@base-monorepo-v2/contracts/schemas/auth/login.req';
import express from 'express';

const router = express.Router();

defineRoute({
  router: router,
  method: 'get',
  path: '/me',
  openapiPath: '/api/users/me',
  operationId: 'getMe',
  summary: 'Get current authenticated user',
  description: 'Returns the profile information of the currently authenticated user.',
  tags: ['Users'],
  userRoles: [],
  auth: true,
  validate: {
    body: loginSchema,
  },
  response: authTokenResSchema,

  controller: async (req, res) => {
    req.user.id;
    req.body.password;

    res.json({
      message: '',
      data: {
        accessToken: '1',
        refreshToken: '1',
        refreshCookieMaxAge: 1,
      },
    });
  },
  responses: {
    '200': {
      description: 'User profile retrieved successfully',
      schema: authTokenResSchema,
    },
  },
});
