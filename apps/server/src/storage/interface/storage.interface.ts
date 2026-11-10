import { S3Client } from '@aws-sdk/client-s3';
import type { GeneratePresignedUrlParams } from '../types/PresignedUrl';

export interface IStorageProvider {
  client: S3Client;

  generatePresignedUrl(params: GeneratePresignedUrlParams): Promise<string>;

  getObjectUrl(fileKey: string): string;
}
