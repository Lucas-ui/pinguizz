import { Hono } from "hono";
import { moduleController } from "../controllers/module";

export const router = new Hono();

router.get("/", moduleController.get);
 