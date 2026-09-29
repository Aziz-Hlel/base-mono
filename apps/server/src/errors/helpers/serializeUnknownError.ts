export function serializeUnknownError(error: unknown): Record<string, unknown> | null {
  if (error === null || error === undefined) return null;

  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
      // spread everything else on the error object — Prisma fields, Axios fields, whatever
      ...Object.fromEntries(Object.entries(error).filter(([key]) => !['name', 'message', 'stack'].includes(key))),
      // recurse into cause if it exists
      ...(error.cause !== undefined && { cause: serializeUnknownError(error.cause) }),
    };
  }

  // handles thrown strings, numbers, plain objects — not recommended but it happens
  if (typeof error === 'object') {
    return { ...(error as Record<string, unknown>) };
  }

  return null;
}
