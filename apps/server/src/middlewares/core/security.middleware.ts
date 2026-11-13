import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

export function securityMiddleware() {
  return [
    helmet(), // secure headers
    rateLimit({
      windowMs: 60 * 1000, // 1 minute
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  ];
}
