import { InternalServerErrorException, ServiceUnavailableException } from '@/exceptions';
import { ERROR_CODES } from '@base-monorepo-v2/contracts/exceptions/codes';
import type { FirebaseAuthError } from 'firebase-admin/auth';

export const handleFirebaseInfraException = (error: FirebaseAuthError) => {
  if (error.hasCode('project-not-found'))
    throw new InternalServerErrorException('Internal server error', {
      code: ERROR_CODES.GLOBAL.INTERNAL_SERVER_ERROR,
      cause: error,
      internalLog: `The Firebase project could not be found. Please check your Firebase configuration`,
    });
  if (error.hasCode('internal-error'))
    throw new InternalServerErrorException('Internal server error', {
      code: ERROR_CODES.GLOBAL.INTERNAL_SERVER_ERROR,
      cause: error,
      details: {
        triggerCause: `Unexpected internal server error from Google's Auth servers or an inability to fetch Google's public x509 certs.`,
      },
    });

  if (
    error.hasCode('network-timeout') ||
    error.hasCode('network-error') ||
    error.hasCode('service-unavailable') ||
    error.hasCode('internal-error')
  )
    throw new ServiceUnavailableException('Service unavailable', {
      code: ERROR_CODES.GLOBAL.SERVICE_UNAVAILABLE,
      cause: error,
      internalLog: `Firebase service is temporarily unavailable`,
    });

  if (
    error.hasCode('auth/insufficient-permission') ||
    error.hasCode('auth/invalid-credential') ||
    error.hasCode('auth/project-not-found') ||
    error.hasCode('app/quota-exceeded')
  ) {
    throw new InternalServerErrorException('Internal server error', {
      code: ERROR_CODES.GLOBAL.INTERNAL_SERVER_ERROR,
      cause: error,
    });
  }
};
