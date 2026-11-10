import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import type { IStorageProvider } from '../interface/storage.interface';
import type { GeneratePresignedUrlParams } from '../types/PresignedUrl';

interface AwsStorageConfig {
  AWS_REGION: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  AWS_S3_BUCKET: string;
  AWS_CLOUDFRONT_URL: string;
}

export class AwsStorageProvider implements IStorageProvider {
  client: S3Client;
  config: AwsStorageConfig;

  constructor(config: AwsStorageConfig) {
    this.config = config;
    this.client = new S3Client({
      region: config.AWS_REGION,
      credentials: {
        accessKeyId: config.AWS_ACCESS_KEY_ID,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async generatePresignedUrl({
    mediaKey: fileKey,
    mimeType,
    expiresIn,
  }: GeneratePresignedUrlParams): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.config.AWS_S3_BUCKET,
      Key: fileKey,
      ContentType: mimeType,
    });

    const signedUrl = await getSignedUrl(this.client, command, { expiresIn });

    return signedUrl;
  }

  private isFakerMedia(fileKey: string): boolean {
    return fileKey.startsWith(`http://`) || fileKey.startsWith(`https://`);
  }

  getObjectUrl(fileKey: string): string {
    if (this.isFakerMedia(fileKey)) {
      return fileKey;
    }

    return `https://${this.config.AWS_CLOUDFRONT_URL}/${fileKey}`;
  }
}
