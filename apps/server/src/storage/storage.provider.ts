import ENV from '@/env';
import type { IStorageProvider } from './interface/storage.interface';
import { AwsStorageProvider } from './providers/awsStorage.provider';
import { MinioProvider } from './providers/minio.provider';

export function createStorageProvider(): IStorageProvider {
  switch (ENV.NODE_ENV) {
    case 'dev':
    case 'build':
      return new MinioProvider({
        MINIO_REGION: ENV.MINIO_REGION,
        MINIO_PORT: ENV.MINIO_PORT,
        MINIO_ROOT_USER: ENV.MINIO_ROOT_USER,
        MINIO_ROOT_PASSWORD: ENV.MINIO_ROOT_PASSWORD,
        MINIO_BUCKET: ENV.MINIO_BUCKET,
      });

    case 'production':
    case 'stage':
      return new AwsStorageProvider({
        AWS_REGION: ENV.AWS_REGION,
        AWS_ACCESS_KEY_ID: ENV.AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY: ENV.AWS_SECRET_ACCESS_KEY,
        AWS_S3_BUCKET: ENV.AWS_S3_BUCKET,
        AWS_CLOUDFRONT_URL: ENV.AWS_CLOUDFRONT_URL,
      });
  }
}

export const StorageProvider: IStorageProvider = createStorageProvider();
