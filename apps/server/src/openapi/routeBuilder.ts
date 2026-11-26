import type { Request, Router } from 'express';
import type { z } from 'zod';
import { defineRoute, type ApiRoute } from './defineRoute';

/** The fields set one-by-one through the chain. */
type RouteMeta = Pick<
  ApiRoute,
  'router' | 'method' | 'path' | 'openapiPath' | 'operationId' | 'summary' | 'description' | 'tags'
>;
type MetaKey = keyof RouteMeta;

/** Chain steps that must be called before `.define()` becomes available. */
type RequiredMetaKey = 'router' | 'method' | 'path' | 'openapiPath' | 'operationId';

/** Everything else, passed in one object to `.define()`. */
export type RouteRest<
  TBody extends z.ZodType = z.ZodType<unknown>,
  TParams extends z.ZodType = z.ZodType<Request['params']>,
  TQuery extends z.ZodType = z.ZodType<Request['query']>,
  TAuth extends boolean = true,
  TResBody extends z.ZodType = z.ZodType,
> = Omit<ApiRoute<TBody, TParams, TQuery, TAuth, TResBody>, MetaKey>;

type DefineStep = {
  define: <
    TBody extends z.ZodType = z.ZodType<unknown>,
    TParams extends z.ZodType = z.ZodType<Request['params']>,
    TQuery extends z.ZodType = z.ZodType<Request['query']>,
    TAuth extends boolean = true,
    TResBody extends z.ZodType = z.ZodType,
  >(
    rest: RouteRest<TBody, TParams, TQuery, TAuth, TResBody>,
  ) => ApiRoute<TBody, TParams, TQuery, TAuth, TResBody>;
};

/**
 * `TSet` tracks which chain steps have been called. `.define()` only appears
 * on the type once every key in `RequiredMetaKey` is in `TSet`.
 */
export type RouteBuilder<TSet extends MetaKey = never> = {
  router: (router: Router) => RouteBuilder<TSet | 'router'>;
  method: (method: RouteMeta['method']) => RouteBuilder<TSet | 'method'>;
  path: (path: string) => RouteBuilder<TSet | 'path'>;
  openapiPath: (openapiPath: string) => RouteBuilder<TSet | 'openapiPath'>;
  operationId: (operationId: string) => RouteBuilder<TSet | 'operationId'>;
  summary: (summary: string) => RouteBuilder<TSet | 'summary'>;
  description: (description: string) => RouteBuilder<TSet | 'description'>;
  tags: (...tags: string[]) => RouteBuilder<TSet | 'tags'>;
} & ([RequiredMetaKey] extends [TSet] ? DefineStep : unknown);

// Each step returns a NEW builder (immutable), so a partially built chain can be reused safely.
const createBuilder = <TSet extends MetaKey>(meta: Partial<RouteMeta>): RouteBuilder<TSet> => {
  const set =
    <K extends MetaKey>(key: K) =>
    (value: RouteMeta[K]) =>
      createBuilder<TSet | K>({ ...meta, [key]: value });

  const builder = {
    router: set('router'),
    method: set('method'),
    path: set('path'),
    openapiPath: set('openapiPath'),
    operationId: set('operationId'),
    summary: set('summary'),
    description: set('description'),
    tags: (...tags: string[]) => createBuilder<TSet | 'tags'>({ ...meta, tags }),
    define: (rest: RouteRest) => defineRoute({ ...(meta as RouteMeta), ...rest }),
  };

  return builder as unknown as RouteBuilder<TSet>;
};

/**
 * Chained alternative to `defineRoute`.
 *
 * @example
 * route()
 *   .router(router)
 *   .method('get')
 *   .path('/me')
 *   .openapiPath('/api/users/me')
 *   .operationId('getMe')
 *   .summary('Get current authenticated user')
 *   .tags('Users')
 *   .define({
 *     auth: true,
 *     userRoles: [],
 *     validate: { body: loginSchema },
 *     response: authTokenResSchema,
 *     responses: { 200: { description: 'OK' } },
 *     controller: async (req, res) => { ... },
 *   });
 */
export const route = (): RouteBuilder => createBuilder<never>({});
