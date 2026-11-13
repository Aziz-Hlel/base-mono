import { asyncHandler } from '@/core/async-handler';
import { authMiddleware } from '@/middlewares/app/authenticate';
import requireUserRoles from '@/middlewares/app/requirePermission.middleware';
import { validateMiddleware } from '@/middlewares/validate.middleware';
import type { AccessTokenPayload } from '@/modules/auth/jwt.service';
import type { SucessResponseParams } from '@/types/express';
import type { RouteParameter } from '@asteasolutions/zod-to-openapi/dist/openapi-registry';
import type { UserRole } from '@base-monorepo-v2/db/prisma';
import type { NextFunction, Request, RequestHandler, Response, Router } from 'express';
import type { z, ZodType } from 'zod';
import { serverRegistry } from '.';

export const validate = <
  TBody extends z.ZodType = z.ZodType<unknown>,
  TParams extends z.ZodType = z.ZodType<Request['params']>,
  TQuery extends z.ZodType = z.ZodType<Request['query']>,
>(schema: {
  body?: TBody;
  params?: TParams;
  query?: TQuery;
}): RequestHandler<z.infer<TParams>, unknown, z.infer<TBody>, z.infer<TQuery>> => {
  return async (req, _res, next) => {
    try {
      if (schema.body) req.body = await schema.body.parseAsync(req.body);
      if (schema.params) req.params = await schema.params.parseAsync(req.params);
      if (schema.query) {
        // Express 5: req.query is a getter, so plain assignment throws.
        Object.defineProperty(req, 'query', {
          value: await schema.query.parseAsync(req.query),
          writable: true,
          configurable: true,
          enumerable: true,
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export type ApiRoute<
  TBody extends z.ZodType = z.ZodType<unknown>,
  TParams extends z.ZodType = z.ZodType<Request['params']>,
  TQuery extends z.ZodType = z.ZodType<Request['query']>,
  TAuth extends boolean = true,
  TResBody extends z.ZodType = z.ZodType,
> = {
  router: Router;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  path: string;
  openapiPath: string;

  operationId: string;
  summary?: string;
  description?: string;
  tags?: string[];

  auth: TAuth;
  userRoles: UserRole[];

  validate: {
    body?: TBody;
    params?: TParams;
    query?: TQuery;
  };

  request?: {
    headers?: RouteParameter;
    params?: RouteParameter;
    query?: RouteParameter;
    body?: ZodType;
  };

  response: TResBody;

  responses: Record<
    number,
    {
      description: string;
      // ! first off this is flase, it needs at least SucessResponseParams<z.infer<TResBody>, but i rather add another type 'simple'|'pagianted'|'cursor' and based on that type infer the exact return type of response
      // ! now that i m thinking of it you need to make a generic shema , just like type idk how you make that maybe a conbo between generic type nad a funtion embedidng the response type wit the envelope type
      schema?: ZodType;
    }
  >;

  controller: (
    req: Request<z.infer<TParams>, unknown, z.infer<TBody>, z.infer<TQuery>> & {
      user: TAuth extends true ? AccessTokenPayload : never;
    },
    res: Response<SucessResponseParams<z.infer<TResBody>>>,
    next: NextFunction,
  ) => Promise<void>;
};

const registerOpenApiRoute = <
  TBody extends z.ZodType = z.ZodType<unknown>,
  TParams extends z.ZodType = z.ZodType<Request['params']>,
  TQuery extends z.ZodType = z.ZodType<Request['query']>,
  TAuth extends boolean = true,
  TResBody extends z.ZodType = z.ZodType,
>(
  params: ApiRoute<TBody, TParams, TQuery, TAuth, TResBody>,
) => {
  serverRegistry.registerPath({
    method: params.method,
    path: params.openapiPath,
    operationId: params.operationId,
    summary: params.summary,
    description: params.description,
    tags: params.tags,

    request: {
      headers: params.request?.headers,
      params: params.request?.params,
      query: params.request?.query,
      body: params.request?.body
        ? {
            content: {
              'application/json': {
                schema: params.request.body,
              },
            },
          }
        : undefined,
    },

    // Convert schemas into valid OpenAPI response content objects
    responses: Object.fromEntries(
      Object.entries(params.responses).map(([status, res]) => [
        status,
        {
          description: res.description,
          content: res.schema
            ? {
                'application/json': {
                  schema: res.schema,
                },
              }
            : undefined,
        },
      ]),
    ),
  });
};

export const defineRoute = <
  TBody extends z.ZodType = z.ZodType<unknown>,
  TParams extends z.ZodType = z.ZodType<Request['params']>,
  TQuery extends z.ZodType = z.ZodType<Request['query']>,
  TAuth extends boolean = true,
  TResBody extends z.ZodType = z.ZodType,
>(
  params: ApiRoute<TBody, TParams, TQuery, TAuth, TResBody>,
) => {
  const routerWithMethod = params.router[params.method];

  const middlewares = [];
  if (params.auth) middlewares.push(authMiddleware);
  if (Object.keys(params.validate).length > 0) middlewares.push(validateMiddleware);
  if (Object.keys(params.userRoles).length > 0) middlewares.push(requireUserRoles);

  const requestHandler = asyncHandler(params.controller);
  routerWithMethod(params.path, [...middlewares, requestHandler]);

  registerOpenApiRoute(params);

  return params;
};
