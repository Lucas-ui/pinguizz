import { Hono } from "hono";
import { validate } from "../middlewares/validate";
import { userSchema } from "../validators/user";
import { userController } from "../controllers/user";
import { authentification } from "../middlewares/auth";


export const router = new Hono();

router.get("/", authentification, userController.get);

router.put("/", authentification, validate(userSchema), userController.update);

router.delete("/", authentification, userController.delete);

router.post("/password", authentification, userController.password)
