import { Hono } from "hono";
import { partieController } from "../controllers/partie";
import { authentification } from "../middlewares/auth";

export const router = new Hono();

router.get("/:module", partieController.start);
 
router.post("/", authentification, partieController.result)

router.get("/stats", authentification, partieController.stats);