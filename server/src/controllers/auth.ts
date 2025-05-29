import { type Context } from "hono";
import { sign, verify } from "jsonwebtoken";
import { logger } from "../class/logger";
import { User } from "../database/models/user";
import { hasher } from "../class/hasher";
import Identifier from "../class/identifier";
import { directory } from "../class/directory";
import { Op, ValidationError } from "sequelize";

class AuthController {
    async register(c: Context) {
        const data = c.get("validatedBody");

        try {
            const hashedPassword = await hasher.hash(data.password);

            const avatar = await directory.getAvatar();

            const newUser = await User.create({
                id: Identifier.uuidV4(),
                username: data.username,
                name: data.name,
                firstname: data.firstname,
                password: hashedPassword,
                isAdmin: false,
                image: avatar,
            });

            const dataNewUser = newUser.get({ plain: true });
            logger.loggerApi.info(
                `Inscription réussie: ${dataNewUser.username}`
            );

            return c.json(
                {
                    message: "Utilisateur créé avec succès",
                    username: dataNewUser.username,
                },
                201
            );
        } catch (error) {
            if (error instanceof ValidationError) {
                return c.json(
                    { error: error.errors.map((e) => e.message) },
                    400
                );
            }
            logger.loggerAuth.error(
                `Erreur lors de l'inscription: ${data.username} | ${error}`
            );
            return c.json(
                { error: "Erreur lors de la création", details: error.message },
                500
            );
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

            const token = sign(
                { userId: user.id, isAdmin: user.isAdmin },
                process.env.JWT_SECRET!,
                {
                    expiresIn: "1h",
                }
            );

            logger.loggerApi.info("Connexion réussie: " + user.id);

            const dataUser = {
                username: user.id,
                token: token,
            };

            return c.json({ user: dataUser }, 200);
        } catch (error) {
            logger.loggerAuth.error(
                "Erreur lors de la connexion: " + data.id + " | " + error
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

            logger.loggerApi.info(
                "Utilisateur " +
                    decoded.userId +
                    " déconnecté (token oublié côté client)"
            );

            return c.json(200);
        } catch (error) {
            logger.loggerAuth.error("Erreur lors de la déconnexion |", error);
            return c.json({ error: "Erreur lors de la déconnexion" }, 500);
        }
    }
}

export const authController = new AuthController();
