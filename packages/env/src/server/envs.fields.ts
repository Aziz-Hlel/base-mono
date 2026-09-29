import z from 'zod';

// App
export const API_PORT = z.coerce.number().positive();

// Firebase
export const FIREBASE_CERT = z.string().trim();

// DB
export const dbSchema = {
  DB_USER: z.string().trim(),
  DB_PASSWORD: z.string().trim(),
  DB_NAME: z.string().trim(),
  DB_PORT: z.coerce.number(),
  DB_HOST: z.enum(['localhost', 'db']),
};

// Redis
export const redisSchema = {
  REDIS_PORT: z.coerce.number().positive(),
  REDIS_PASSWORD: z.string().trim(),
  REDIS_HOST: z.enum(['localhost', 'redis']),
};

// SMTP
export const smtpSchema = {
  SMTP_HOST: z.string().trim(),
  SMTP_PORT: z.coerce.number().positive(),
  SMTP_SECURE: z
    .string()
    .trim()
    .refine((val) => val === 'true' || val === 'false', {
      message: 'SMTP_SECURE must be true or false',
    })
    .transform((val) => val === 'true'),
  SMTP_USER: z.string().trim(),
  SMTP_PASS: z.string().trim(),
};

// App versions
export const mobileVersionsSchema = {
  IOS_MIN_SUPPORTED_VER: z
    .string()
    .trim()
    .regex(/^\d+\.\d+\.\d+$/, {
      message: 'IOS_MIN_SUPPORTED_VER must be in the format x.y.z',
    }),

  ANDROID_MIN_SUPPORTED_VER: z
    .string()
    .trim()
    .regex(/^\d+\.\d+\.\d+$/, {
      message: 'ANDROID_MIN_SUPPORTED_VER must be in the format x.y.z',
    }),
};
export type MobileVersionsSchema = z.infer<z.ZodObject<typeof mobileVersionsSchema>>;

// Storage
export const minioSchema = {
  MINIO_REGION: z.string().trim(),
  MINIO_ROOT_USER: z.string().trim(),
  MINIO_ROOT_PASSWORD: z.string().trim(),
  MINIO_BUCKET: z.string().trim(),
  MINIO_PORT: z.coerce.number().positive(),
};

// CORS
export const corsSchema = {
  ALLOWED_ORIGIN_PATTERNS: z
    .string({ error: 'ALLOWED_ORIGIN_PATTERNS is required in prod environments' })
    .transform((origins) => origins.split(','))
    .refine(
      (origins) => {
        const regexOrigins = /^https?:\/\/([a-z0-9-]+\.)+[a-z]{2,}$/i;
        return origins.every((origin) => regexOrigins.test(origin));
      },
      {
        error: 'ALLOWED_ORIGIN_PATTERNS is invalid, it must follow "http://domain.com,https://domain.com"',
      },
    ),
};

export type CorsSchema = z.infer<z.ZodObject<typeof corsSchema>>;

// AWS STORAGE
export const awsStorageSchema = {
  AWS_REGION: z.string().trim(),
  AWS_ACCESS_KEY_ID: z.string().trim(),
  AWS_SECRET_ACCESS_KEY: z.string().trim(),
  AWS_S3_BUCKET: z.string().trim(),
};

export type AwsStorageSchema = z.infer<z.ZodObject<typeof awsStorageSchema>>;

// CDN
export const cdnSchema = {
  AWS_CLOUDFRONT_URL: z.string().trim(),
};

// AWS Bedrock
export const awsBedrockSchema = {
  AWS_BEDROCK_REGION: z.string().trim(),
  AWS_BEDROCK_ACCESS_KEY_ID: z.string().trim(),
  AWS_BEDROCK_SECRET_ACCESS_KEY: z.string().trim(),
  AWS_BEDROCK_MODEL_ID: z.string().trim(),
};

export type AwsBedrockSchema = z.infer<z.ZodObject<typeof awsBedrockSchema>>;

export type CdnSchema = z.infer<z.ZodObject<typeof cdnSchema>>;

export const oneSignalSchema = {
  ONE_SIGNAL_APP_SECRET: z.string().trim().nonempty(),
  ONE_SIGNAL_APP_ID: z.string().trim().nonempty(),
};
