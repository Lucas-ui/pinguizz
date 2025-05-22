import { type Context } from "hono";
import { User } from "../models/user";
import { hasher } from "../class/hasher";
class UserController {
    async get(c: Context) {
        const userId = c.get("userId");
        const users = await User.findByPk(userId);
        return c.json(users);
    }

    async update(c: Context) {
        const userId = c.get("userId");
        const userData = c.get("validatedBody");
        await User.update(
            { username: userData.username },
            { where: { username: userId } }
        );
        return c.json({}, 200);
    }

    async delete(c: Context) {
        const userId = c.get("userId");
        await User.destroy({
            where: { username: userId },
        });
        return c.json({}, 200);
    }

    async password(c: Context) {
        try {
            const userId = c.get("userId");
            if (!userId) {
            return c.json({ error: "Utilisateur non authentifié." }, 401);
            }

            const { newPassword, confirmPassword } = await c.req.json();

            if (!newPassword || !confirmPassword) {
            return c.json({ error: "Nouveau mot de passe et confirmation requis." }, 400);
            }

            if (newPassword !== confirmPassword) {
            return c.json({ error: "Les mots de passe ne correspondent pas." }, 400);
            }

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/;
            if (!passwordRegex.test(newPassword)) {
            return c.json({
                error: "Mot de passe trop faible. Il doit contenir au moins 12 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."
            }, 400);
            }

            const hashedPassword = await hasher.hash(newPassword, "bcrypt");

            const user = await User.findOne({ where: { username: userId } });
            if (!user) {
            return c.json({ error: "Utilisateur introuvable." }, 404);
            }

            user.password = hashedPassword;
            await user.save();

            return c.json({ message: "Mot de passe mis à jour avec succès." }, 200);

        } catch (err) {
            console.error("Erreur dans password:", err);
            return c.json({ error: "Erreur serveur." }, 500);
        }
    }



}

export const userController = new UserController();
