import { type Context } from "hono";
import { Theme } from "../models/theme";
import { Module } from "../models/module";

class ModuleController {
  async getByTheme(c: Context) {
    const themeName = c.req.param("name_theme");

    try {
      const theme = await Theme.findOne({ where: { name: themeName } });

      if (!theme) {
        return c.json({ error: "Thème introuvable" }, 404);
      }

      const modules = await Module.findAll({
        where: { id_theme: theme.id },
      });

      return c.json(modules);
    } catch (error) {
      return c.json({ error: "Erreur serveur" }, 500);
    }
  }
}

export const moduleController = new ModuleController();
