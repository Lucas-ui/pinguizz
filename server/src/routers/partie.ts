import { Hono } from "hono";
import { partieController } from "../controllers/partie";
import { authentification } from "../middlewares/auth";

export const router = new Hono();


 
router.post("/", authentification, partieController.result)

router.get("/stats", authentification, partieController.stats);

router.get("/history", authentification, partieController.history);

router.get("/all", authentification, partieController.all);

router.get("/:module", partieController.start);