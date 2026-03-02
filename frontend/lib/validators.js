/**
 * @file Zod validation schemas used by frontend forms.
 */

import { z } from 'zod';

export const loginSchema = z.object({
  identifier: z.string().min(3, 'Email or phone is required'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone is required'),
  role: z.enum(['admin', 'investor', 'buyer', 'viewer']),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  subject: z.enum([
    'General Inquiry',
    'Investment Consultation',
    'Partnership',
    'Developer Listing',
    'Bug Report',
    'Feature Request'
  ]),
  message: z.string().min(20),
  budgetRange: z.string().optional()
});
