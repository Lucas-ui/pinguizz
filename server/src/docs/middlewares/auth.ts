import { type Context, type Next } from "hono";
import { verify } from "jsonwebtoken";

export const authentification = async (c: Context, next: Next) => {
    try {
        const token = c.req.header("cookie")?.split("token=")[1]?.split(";")[0];

        if (!token) {
            return c.json({ error: "Accès refusé. Token manquant." }, 401);
        }

        const decoded = verify(token, process.env.JWT_SECRET!) as {
            userId: string;
            role?: string;
        };

        if (!decoded || !decoded.userId) {
            return c.json({ error: "Token invalide. userId manquant." }, 401);
        }

        c.set("userId", decoded.userId);
        c.set("userRole", decoded.role || "user");

        await next();
    } catch (error) {
        console.error("Erreur de vérification du token:", error);
        return c.json({ error: "Accès refusé. Token invalide." }, 401);
    }
};
