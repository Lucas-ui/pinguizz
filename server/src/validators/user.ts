import { z } from "zod";

export const userSchema = z.object({
    username: z
        .string()
        .trim()
        .transform(
            (val) => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()
        ),
    password: z
        .string()
        .min(10, "Le mot de passe doit contenir au moins 10 caractères"),
});

export const registerSchema = z.object({
    username: z
        .string()
        .trim()
        .transform(
            (val) => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()
        ),
    password: z
        .string()
        .min(10, "Le mot de passe doit contenir au moins 10 caractères"),
    confirmPassword: z
        .string()
        .min(10, "Le mot de passe doit contenir au moins 10 caractères"),
});
