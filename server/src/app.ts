import { Hono, type Context, type Next } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "hono/bun";
import { router as userRouter } from "./routers/user";
import { router as authRouter } from "./routers/auth";
import { router as themeRouter } from "./routers/theme";
import { router as moduleRouter } from "./routers/module";

import { logger } from "./class/logger";
import Database from "./database/db";
import { swaggerRoute } from "./docs/API/swagger";

const corsCredentials = process.env.CORS_CREDENTIALS === "true";
const methods = process.env.CORS_METHODS
    ? process.env.CORS_METHODS.split(",")
    : [];
const headers = process.env.CORS_HEADERS
    ? process.env.CORS_HEADERS.split(",")
    : [];
const origin = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",")
    : [];

logger.loggerConsole.info("");
logger.loggerConsole.info("🚀 Environnement : " + process.env.ENV);
logger.loggerConsole.info("PMA : http://localhost:9090");

(async () => {
    try {
        await Database.connect(); 
        logger.loggerConsole.info("📦 Base de données initialisée");
    } catch (error) {
        logger.loggerConsole.error(
            "❌ Erreur lors de l'initialisation de la base :",
            error
        );
        process.exit(1);
    }
})();

const app = new Hono();

if (process.env.ENV === "dev") {
    logger.loggerConsole.info("Documentation API : http://localhost/api/docs");
    swaggerRoute(app);
}

app.use(
    "*",
    cors({
        origin: origin,
        allowMethods: methods,
        allowHeaders: headers,
        credentials: corsCredentials,
        maxAge: Number(process.env.CORS_AGE),
    })
);

app.use("*", async (c: Context, next: Next) => {
    const startTime = Date.now();

    await next();

    const duration = Date.now() - startTime;
    logger.loggerApi.info(
        `Méthode: ${c.req.method} | URL: ${c.req.url} | Durée: ${duration}ms`
    );
});

app.route("/api/users", userRouter);
app.route("/api/auth", authRouter);
app.route("/api/theme", themeRouter);
app.route("/api/module", moduleRouter);

// Images
app.get(
  "/api/images/avatar/*",
  serveStatic({
    root: "./src/images/avatar",
    rewriteRequestPath: (path) => path.replace("/api/images/avatar", ""),
  })
);

app.get(
  "/api/images/theme/*",
  serveStatic({ root: "./src/images/theme" })
);

app.get(
  "/api/images/module/*",
  serveStatic({ root: "./src/images/module" })
);

app.get("/api", (c: Context) => c.text("API avec Bun et Hono !"));

export default {
    port: process.env.PORT || 3000,
    fetch: app.fetch,
};