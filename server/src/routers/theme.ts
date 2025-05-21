import { Hono } from "hono";
import { themeController } from "../controllers/theme";
import { validate } from "../middlewares/validate";
import { userSchema, registerSchema } from "../validators/user";
import { authentification } from "../middlewares/auth";

export const router = new Hono();

router.get("/", themeController.get);

