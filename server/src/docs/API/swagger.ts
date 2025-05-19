import swaggerJsdoc from "swagger-jsdoc";
import { Hono } from "hono";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Documentation API | Abyss",
            version: "1.0.0",
        },
    },
    apis: ["./src/routers/*.ts"], // Assure-toi que ce chemin est bon
};

const swaggerSpec = swaggerJsdoc(options);
const docsApp = new Hono();

docsApp.get("/json", async (c) => {
    return c.json(swaggerSpec);
});

docsApp.get("/", async (c) => {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Swagger UI</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.10.5/swagger-ui.min.css">
    </head>
    <body>
        <div id="swagger-ui"></div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.10.5/swagger-ui-bundle.min.js"></script>
        <script>
            window.onload = () => {
                SwaggerUIBundle({
                    url: "/docs/json",
                    dom_id: "#swagger-ui"
                });
            };
        </script>
    </body>
    </html>
  `;
    return c.html(html);
});

export const swaggerRoute = (app: Hono) => {
    app.route("/docs", docsApp);
};
