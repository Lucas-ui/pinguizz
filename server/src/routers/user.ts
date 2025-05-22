import { Hono } from "hono";
import { validate } from "../middlewares/validate";
import { userSchema } from "../validators/user";
import { userController } from "../controllers/user";
import { authentification } from "../middlewares/auth";


export const router = new Hono();

router.delete("/", authentification, userController.delete);

router.put("/password", authentification, userController.password)

router.put("/name", authentification, userController.name)
router.put("/firstname", authentification, userController.firstname)
router.put("/username", authentification, userController.username)