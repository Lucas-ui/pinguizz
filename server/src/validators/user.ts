import { z } from "zod";

export const userSchema = z.object({
    username: z
      .string()
      .trim()
      .min(1, 'Le nom d’utilisateur est requis.')
      .max(40, 'Le nom d’utilisateur ne doit pas dépasser 40 caractères.')
      .transform((val) => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()),
    password: z
        .string()
        .min(12, "Le mot de passe doit contenir au moins 12 caractères."),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(1, 'Le nom d’utilisateur est requis.')
      .max(40, 'Le nom d’utilisateur ne doit pas dépasser 40 caractères.')
      .transform((val) => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()),
    name: z
      .string()
      .trim()
      .min(1, 'Le nom est requis.')
      .max(40, 'Le nom ne doit pas dépasser 40 caractères.'),
    firstname: z
      .string()
      .trim()
      .min(1, 'Le prénom est requis.')
      .max(40, 'Le prénom ne doit pas dépasser 40 caractères.'),
    password: z
      .string()
      .min(12, 'Le mot de passe doit contenir au moins 12 caractères.')
      .max(60, 'Le mot de passe ne doit pas dépasser 60 caractères.'),
    confirmPassword: z
      .string()
      .min(12, 'La confirmation du mot de passe doit contenir au moins 12 caractères.')
      .max(60, 'La confirmation du mot de passe ne doit pas dépasser 60 caractères.'),
    isAdmin: z.boolean().optional().default(false)
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas.',
    path: ['confirmPassword'],
  });
