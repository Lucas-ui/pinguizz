import { type Context } from "hono";
import { Module } from "../models/module";

class ModuleController {
  async get(c: Context) {
    try {
      const modules = await Module.findAll({
        include: [
          {
            association: "theme",
          },
        ],
      });
      return c.json(modules, 200);
    } catch (error) {
      return c.json({ error: "Erreur serveur lors de la récupération des modules" }, 500);
    }
  }
}

export const moduleController = new ModuleController();
