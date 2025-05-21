import { Hono } from "hono";
import { partieController } from "../controllers/partie";

export const router = new Hono();

router.get("/", partieController.startPartie);
 