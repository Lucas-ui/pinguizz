import { type Context } from "hono";
import { Theme } from "../models/theme";

class ThemeController {
    async get(c: Context) {
    try {
      const themes = await Theme.findAll();
      return c.json(themes, 200);
    } catch (error) {
      return c.json({ error: "Erreur serveur lors de la récupération des thèmes" }, 500);
    }
  }
}

export const themeController = new ThemeController();
