import { z } from 'zod';

export const zodEmail = () =>
  z.email('Invalid email').trim().toLowerCase().max(255, 'Email must be at most 255 characters');
