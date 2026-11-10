import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import type { IStorageProvider } from '../interface/storage.interface';
import type { GeneratePresignedUrlParams } from '../types/PresignedUrl';

export type IMinioConfig = {
  MINIO_REGION: string;
  MINIO_PORT: number;
  MINIO_ROOT_USER: string;
  MINIO_ROOT_PASSWORD: string;
  MINIO_BUCKET: string;
};

export class MinioProvider implements IStorageProvider {
  client: S3Client;
  private MINIO_REGION: string;
  private MINIO_PORT: number;
  private MINIO_BUCKET: string;

  constructor({
    MINIO_REGION,
    MINIO_PORT,
    MINIO_ROOT_USER,
    MINIO_ROOT_PASSWORD,
    MINIO_BUCKET,
  }: IMinioConfig) {
    this.MINIO_REGION = MINIO_REGION;
    this.MINIO_PORT = MINIO_PORT;
    this.MINIO_BUCKET = MINIO_BUCKET;

    this.client = new S3Client({
      region: this.MINIO_REGION,
      endpoint: `http://localhost:${this.MINIO_PORT}/`,
      credentials: {
        accessKeyId: MINIO_ROOT_USER,
        secretAccessKey: MINIO_ROOT_PASSWORD,
      },
      forcePathStyle: true,
    });
  }

  private isFakerMedia(fileKey: string): boolean {
    return fileKey.startsWith(`http://`) || fileKey.startsWith(`https://`);
  }

  async generatePresignedUrl({
    mediaKey: fileKey,
    mimeType,
    expiresIn,
  }: GeneratePresignedUrlParams): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.MINIO_BUCKET,
      Key: fileKey,
      ContentType: mimeType,
      // ContentDisposition: 'attachment', // Security: prevent content-type switching
    });

    const signedUrl = await getSignedUrl(this.client, command, { expiresIn });

    return signedUrl;
  }

  getObjectUrl(fileKey: string): string {
    if (this.isFakerMedia(fileKey)) return fileKey;

    const objectUrl = `http://localhost:${this.MINIO_PORT}/${this.MINIO_BUCKET}/${fileKey}`;
    return objectUrl;
  }
}
