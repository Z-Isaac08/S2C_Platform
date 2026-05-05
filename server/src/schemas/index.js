import * as z from 'zod';

export const memberSchema = z.object({
  firstName: z.string().min(2, 'Prénom trop court').max(50),
  lastName: z.string().min(2, 'Nom trop court').max(50),
  email: z.email('Email invalide'),
  countryCode: z.string().regex(/^\+\d{1,4}$/, 'Code pays invalide'),
  phone: z.string().min(8, 'Numéro trop court').max(15),
  website: z.string().max(0, 'Bot detected').optional(), // Honeypot
});

export const donationSchema = z.object({
  amount: z.number().positive('Le montant doit être positif'),
  email: z.email('Email invalide'),
  phone: z.string().min(8, 'Numéro trop court').max(15),
  method: z.enum(['MOMO', 'CARD']),
  type: z.enum(['ONCE', 'REGULAR']),
  website: z.string().max(0, 'Bot detected').optional(), // Honeypot
});
