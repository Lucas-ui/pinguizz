import { type Context } from "hono";
import { Partie } from "../models/partie";
import { Question } from "../models/question";

class PartieController {
  async startPartie(c: Context) {
    const moduleId = c.req.param("module");

    if (!moduleId) {
      return c.json({ error: "Module ID manquant." }, 400);
    }

    try {
      
      const allQuestions = await Question.findAll({
        where: { id_module: moduleId },
      });

      if (allQuestions.length === 0) {
        return c.json({ error: "Aucune question trouvée pour ce module." }, 404);
      }

      const shuffled = allQuestions.sort(() => Math.random() - 0.5);

      const selectedQuestions = shuffled.slice(0, 15);

      return c.json({ questions: selectedQuestions }, 200);
    } catch (err) {
      console.error("Erreur lors du démarrage de la partie :", err);
      return c.json({ error: "Erreur serveur" }, 500);
    }
  }
}

export const partieController = new PartieController();
