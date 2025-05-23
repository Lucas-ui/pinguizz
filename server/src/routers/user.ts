import { Hono } from "hono";
import { validate } from "../middlewares/validate";
import { userSchema, usernameSchema, firstnameSchema, nameSchema } from "../validators/user";
import { userController } from "../controllers/user";
import { authentification } from "../middlewares/auth";
import { role } from "../middlewares/role";

export const router = new Hono();

router.delete("/", authentification, userController.delete);

router.put("/password", authentification, userController.password)

router.put("/name", validate(nameSchema), authentification, userController.name)

router.put("/firstname", validate(firstnameSchema), authentification, userController.firstname)

router.put("/username", validate(usernameSchema), authentification, userController.username)

router.get("/all", authentification, role([1]), userController.all)

router.delete("/delete/:username", authentification, role([1]), userController.deleteByUsername);