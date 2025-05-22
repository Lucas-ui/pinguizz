import { type Context, type Next } from "hono";
import { verify } from "jsonwebtoken";

export const authentification = async (c: Context, next: Next) => {
    try {
        const authHeader = c.req.header("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return c.json({ error: "Accès refusé. Token manquant." }, 401);
        }

        const token = authHeader.split(" ")[1];

        const decoded = verify(token, process.env.JWT_SECRET!) as {
            userId: string;
            isAdmin?: string;
        };

        if (!decoded || !decoded.userId) {
            return c.json({ error: "Token invalide. userId manquant." }, 401);
        }

        c.set("userId", decoded.userId);
        c.set("userRole", decoded.isAdmin || 0);

        await next();
    } catch (error) {
        console.error("Erreur de vérification du token:", error);
        return c.json({ error: "Accès refusé. Token invalide ou expiré." }, 401);
    }
};
