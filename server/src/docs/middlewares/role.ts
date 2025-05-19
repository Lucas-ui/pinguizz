import { type Context, type Next } from "hono";

export const role = (allowedRoles: string[]) => {
    return async (c: Context, next: Next) => {
        const userRole = c.get("userRole");

        if (!userRole) {
            return c.json({ error: "Accès refusé. Rôle manquant." }, 403);
        }

        if (!allowedRoles.includes(userRole)) {
            return c.json({ error: "Accès refusé. Rôle non autorisé." }, 403);
        }

        await next();
    };
};
