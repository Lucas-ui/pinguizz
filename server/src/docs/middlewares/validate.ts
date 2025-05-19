import { type Context, type Next } from "hono";
import { ZodError } from "zod";

export const validate = (schema: any) => {
    return async (c: Context, next: Next) => {
        try {
            const body = await c.req.json();

            const validatedData = schema.parse(body);

            c.set("validatedBody", validatedData);

            await next();
        } catch (error) {
            if (error instanceof ZodError) {
                return c.json({ error: error.errors }, 400);
            }
            return c.json({ error: "Erreur serveur" }, 500);
        }
    };
};
