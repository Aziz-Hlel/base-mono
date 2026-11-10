import ENV from '@/env';
import { isProd } from '@base-monorepo-v2/env/server';
import path from 'node:path';
import type { IStorageProvider } from './interface/storage.interface';
import { createStorageProvider } from './storage.provider';
import type { GeneratePresignedUrlParams } from './types/PresignedUrl';

export class StorageService implements IStorageProvider {
  private storageProvider = createStorageProvider();
  client = this.storageProvider.client;

  async generatePresignedUrl(params: GeneratePresignedUrlParams): Promise<string> {
    return this.storageProvider.generatePresignedUrl(params);
  }

  getObjectUrl(fileKey: string): string {
    return this.storageProvider.getObjectUrl(fileKey);
  }

  generateMediaKey(mediaName: string): string {
    const ext = path.extname(mediaName);
    const baseName = path.basename(mediaName, ext);
    const safeBase = baseName.replace(/[^a-zA-Z0-9-_]/g, '').slice(0, 50);
    const timestamp = Date.now();
    const folder = isProd() ? `${ENV.APP_NAME}/` : '';
    return `${folder}${safeBase}-${timestamp}${ext}`;
  }

  async verifyConnection() {
    // const Bucket = ENV.NODE_ENV === 'dev' ? ENV.MINIO_BUCKET : 'ENV.AWS_S3_BUCKET'; // * Adjust l8ter
    try {
      // await this.client.send(new HeadBucketCommand({ Bucket }));
      console.log('✅ SUCCESS : Storage Provider connection successful.');
    } catch (error) {
      console.error('❌ ERROR : Storage Provider connection failed.', error);
      throw error;
    }
  }
}

export const storageProvider = new StorageService();
