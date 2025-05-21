import { Hono } from "hono";
import { moduleController } from "../controllers/module";

export const router = new Hono();

router.get("/:name_theme", moduleController.getByTheme);
 