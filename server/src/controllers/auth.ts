import { type Context } from "hono";
import { sign, verify } from "jsonwebtoken";
import { logger } from "../class/logger";
import { User } from "../models/user";
import { hasher } from "../class/hasher";
import { Op, ValidationError } from "sequelize";

class AuthController {
    async register(c: Context) {
        const data = c.get("validatedBody");

        if (data.password != data.confirmPassword) {
            return c.json(
                { error: "Les mots de passe ne correspondent pas." },
                400
            );
        }
        const hashedPassword = await hasher.hash(data.password);

        try {
            const newUser = await User.create({
                username: data.username,
                password: hashedPassword,
            });
            const dataNewUser = newUser.get({ plain: true });

            logger.loggerApi.info("Inscription réussie: " + dataNewUser.id);

            return c.json({}, 200);
        } catch (error) {
            if (error instanceof ValidationError) {
                return c.json(
                    { error: error.errors.map((e) => e.message) },
                    400
                );
            }
            logger.loggerAuth.error(
                "Erreur lors de l'inscription: " + data.username + " | " + error
            );
            return c.json({ error: "Erreur lors de la création" }, 500);
        }
    }

    async signin(c: Context) {
        const data = c.get("validatedBody");
        try {
            const user = await User.findOne({
                where: { username: data.username },
                raw: true,
            });
            if (!user) {
                logger.loggerAuth.warn(
                    "Échec de connexion: " +
                        data.username +
                        " | Utilisateur introuvable"
                );
                return c.json(
                    { error: "Mot de passe ou identifiant incorrect" },
                    400
                );
            }

            const match = await hasher.compare(data.password, user.password);
            if (!match) {
                logger.loggerAuth.warn(
                    "Échec de connexion: " +
                        data.username +
                        " | Mot de passe incorrect"
                );
                return c.json(
                    { error: "Mot de passe ou identifiant incorrect" },
                    400
                );
            }
            const token = sign({ userId: user.id }, process.env.JWT_SECRET!, {
                expiresIn: "1h",
            });
            const cookieSecure = process.env.COOKIE_SECURE === "true";
            c.header(
                "Set-Cookie",
                `token=${token}; HttpOnly; ${
                    cookieSecure ? "Secure;" : ""
                } SameSite=Strict; Path=/`
            );

            logger.loggerApi.info("Connexion réussie: " + user.id);

            const dataUser = {
                username: data.username,
                id: user.id,
                createdAt: user.createdAt,
                updateAt: user.updatedAt,
            };

            return c.json({ user: dataUser }, 200);
        } catch (error) {
            logger.loggerAuth.error(
                "Erreur lors de la connexion: " + data.username + " | " + error
            );
            return c.json({ error: "Erreur lors de la connexion" }, 500);
        }
    }

    async profil(c: Context) {
        const userId = c.get("userId");
        const user = await User.findByPk(userId, {
            attributes: { exclude: ["password"] },
        });

        return c.json(user, 200);
    }

    async logout(c: Context) {
        try {
            const authHeader = c.req.header("Authorization");
            if (!authHeader) {
                logger.loggerAuth.warn("Déconnexion tentée sans token");
                return c.json({ error: "Non connecté" }, 401);
            }

            const token = authHeader.split(" ")[1];
            if (!token) {
                logger.loggerAuth.warn("Déconnexion tentée sans token");
                return c.json({ error: "Non connecté" }, 401);
            }

            const decoded: any = verify(token, process.env.JWT_SECRET!);
            if (!decoded || !decoded.userId) {
                logger.loggerAuth.warn("Token invalide ou expiré");
                return c.json({ error: "Token invalide ou expiré" }, 401);
            }

            const userId = decoded.userId;

            c.header(
                "Set-Cookie",
                `token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`
            );

            logger.loggerApi.info(
                "Utilisateur " + userId + " déconnecté avec succès"
            );

            return c.json({}, 200);
        } catch (error) {
            logger.loggerAuth.error("Erreur lors de la déconnexion |", error);
            return c.json({ error: "Erreur lors de la déconnexion" }, 500);
        }
    }
}

export const authController = new AuthController();
