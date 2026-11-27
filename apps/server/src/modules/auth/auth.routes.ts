import { route } from '@/openapi/routeBuilder';
import { loginSchema } from '@excellense/contracts/schemas/auth/login.req';
import { meResSchema } from '@excellense/contracts/schemas/auth/me.res';
import { refreshTokenBodySchema } from '@excellense/contracts/schemas/auth/refresh.req';
import { registerSchema } from '@excellense/contracts/schemas/auth/register.req';
import { Router } from 'express';
import { z } from 'zod';
import { authConfig } from './auth.config';
import { isMobileClient, readRefreshToken, sendTokens } from './auth.helper';
import { authService } from './auth.service';
import { sessionService } from './session.service';

const authRouter = Router();

const authTokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
});

const logoutQuerySchema = z.object({
  allDevices: z.enum(['true', 'false']).optional(),
});

const logoutResponseSchema = z.null();

// POST /api/auth/register
route()
  .router(authRouter)
  .method('post')
  .path('/register')
  .openapiPath('/api/auth/register')
  .operationId('register')
  .summary('Register a new user')
  .description('Creates a new user account and issues authentication tokens.')
  .tags('Auth')
  .define({
    auth: false,
    userRoles: [],
    validate: { body: registerSchema },
    request: { body: registerSchema },
    response: authTokenResponseSchema,
    responses: {
      '201': { description: 'Account created successfully', schema: authTokenResponseSchema },
      '409': { description: 'Email already registered' },
    },

    controller: async (req, res) => {
      const user = await authService.register(req.body);
      const tokens = await sessionService.issue(user.id, user.role);

      res.status(201).json({
        message: 'Account created successfully',
        data: sendTokens(req, res, tokens),
      });
    },
  });

// POST /api/auth/login
route()
  .router(authRouter)
  .method('post')
  .path('/login')
  .openapiPath('/api/auth/login')
  .operationId('login')
  .summary('Log in with email and password')
  .description('Authenticates a user and issues access and refresh tokens.')
  .tags('Auth')
  .define({
    auth: false,
    userRoles: [],
    validate: { body: loginSchema },
    request: { body: loginSchema },
    response: authTokenResponseSchema,
    responses: {
      '200': { description: 'Logged in successfully', schema: authTokenResponseSchema },
      '401': { description: 'Invalid email or password' },
    },

    controller: async (req, res) => {
      const tokens = await authService.login(req.body);

      res.json({
        message: 'Logged in successfully',
        data: sendTokens(req, res, tokens),
      });
    },
  });

// POST /api/auth/refresh
route()
  .router(authRouter)
  .method('post')
  .path('/refresh')
  .openapiPath('/api/auth/refresh')
  .operationId('refreshTokens')
  .summary('Refresh authentication tokens')
  .description(
    'Rotates the refresh token from cookie (web) or body (mobile) and issues new tokens.',
  )
  .tags('Auth')
  .define({
    auth: false,
    userRoles: [],
    validate: {},
    request: { body: refreshTokenBodySchema },
    response: authTokenResponseSchema,
    responses: {
      '200': { description: 'Tokens refreshed successfully', schema: authTokenResponseSchema },
      '401': { description: 'No refresh token provided or token invalid' },
    },

    controller: async (req, res) => {
      const rawRefreshToken = readRefreshToken(req);
      const tokens = await authService.refresh(rawRefreshToken);

      res.json({
        message: 'Tokens refreshed successfully',
        data: sendTokens(req, res, tokens),
      });
    },
  });

// POST /api/auth/logout
route()
  .router(authRouter)
  .method('post')
  .path('/logout')
  .openapiPath('/api/auth/logout')
  .operationId('logout')
  .summary('Log out current user')
  .description(
    'Revokes the current session (or all sessions when allDevices=true) and clears the refresh cookie.',
  )
  .tags('Auth')
  .define({
    auth: true,
    userRoles: [],
    validate: { query: logoutQuerySchema },
    response: logoutResponseSchema,
    responses: {
      '200': { description: 'Logged out successfully', schema: logoutResponseSchema },
      '401': { description: 'Unauthorized' },
    },

    controller: async (req, res) => {
      const allDevices = req.query.allDevices === 'true';
      const refreshToken = readRefreshToken(req);

      await authService.logout(req.user.id, refreshToken, allDevices);

      if (!isMobileClient(req)) {
        res.clearCookie(authConfig.refreshCookieName, { ...authConfig.cookieOptions });
      }

      res.json({
        message: allDevices ? 'Logged out from all devices' : 'Logged out successfully',
        data: null,
      });
    },
  });

// GET /api/auth/me
route()
  .router(authRouter)
  .method('get')
  .path('/me')
  .openapiPath('/api/auth/me')
  .operationId('getMe')
  .summary('Get current authenticated user')
  .description('Returns the authenticated user.')
  .tags('Auth')
  .define({
    auth: true,
    userRoles: [],
    validate: {},
    response: meResSchema,
    responses: {
      '200': { description: 'Current user fetched successfully', schema: meResSchema },
      '401': { description: 'Unauthorized', schema: meResSchema },
    },

    controller: async (req, res) => {
      const data = await authService.getMe(req.user.id);

      res.json({
        message: 'Current user fetched successfully',
        data,
      });
    },
  });

export default authRouter;
