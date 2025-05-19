import { type Context } from "hono";
import { User } from "../models/user";
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
            { where: { id: userId } }
        );
        return c.json({}, 200);
    }

    async delete(c: Context) {
        const userId = c.get("userId");
        await User.destroy({
            where: { id: userId },
        });
        return c.json({}, 200);
    }
}

export const userController = new UserController();
