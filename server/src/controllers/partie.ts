import { type Context } from "hono";
import { Module } from "../database/models/module";
import { User } from "../database/models/user";
import { Question } from "../database/models/question";
import { Theme } from "../database/models/theme";
import { Posseder } from "../database/models/posseder";
import { Reponse } from "../database/models/reponse";
import { Contenir } from "../database/models/contenir";
import { Partie } from "../database/models/partie";
import identifier from "../class/identifier";

class PartieController {
    async start(c: Context) {
        const moduleName = c.req.param("module");

        if (!moduleName) {
            return c.json({ error: "Nom du module manquant." }, 400);
        }

        try {
            const module = await Module.findOne({
                where: { name: moduleName },
            });

            if (!module) {
                return c.json({ error: "Module introuvable." }, 404);
            }

            const allQuestions = await Question.findAll({
                where: { id_module: module.id },
                include: [
                    {
                        model: Posseder,
                        as: "posseder",
                        include: [
                            {
                                model: Reponse,
                                as: "reponse",
                                attributes: ["id", "intitule"],
                            },
                        ],
                    },
                ],
            });

            if (allQuestions.length === 0) {
                return c.json(
                    { error: "Aucune question trouvée pour ce module." },
                    404
                );
            }

            const shuffled = allQuestions.sort(() => Math.random() - 0.5);
            const selected = shuffled.slice(0, 15);

            const formatted = selected.map((q: any) => ({
                id: q.id,
                text: q.text,
                id_module: q.id_module,
                id_type: q.id_type,
                responses:
                    q.posseder?.map((p: any) => ({
                        id: p.reponse?.id,
                        intitule: p.reponse?.intitule,
                    })) ?? [],
            }));

            return c.json({ questions: formatted }, 200);
        } catch (err) {
            return c.json({ error: "Erreur serveur" }, 500);
        }
    }

    async result(c: Context) {
        try {
            const body = await c.req.json();

            const userId = c.get("userId");

            if (!body || typeof body !== "object") {
                return c.json(
                    {
                        error: "Requête invalide. Le corps de la requête est vide ou incorrect.",
                    },
                    400
                );
            }

            let correctCount = 0;
            const detailedResults = [];

            for (const questionId in body) {
                const selectedResponseIds = Array.isArray(body[questionId])
                    ? body[questionId]
                    : [body[questionId]];

                const question = await Question.findOne({
                    where: { id: questionId },
                });
                if (!question) {
                    console.warn(
                        `❌ Question introuvable pour l'ID : ${questionId}`
                    );
                    continue;
                }

                const allPosseder = await Posseder.findAll({
                    where: { id_question: questionId },
                    include: [
                        {
                            model: Reponse,
                            as: "reponse",
                        },
                    ],
                });

                const responses = allPosseder.map((p) => ({
                    responseId: p.id_reponse,
                    text: p.reponse?.intitule || "Réponse introuvable",
                    isCorrect: p.isCorrect === true,
                    isSelected: selectedResponseIds.includes(p.id_reponse),
                }));

                let isCorrect = true;
                for (const id of selectedResponseIds) {
                    const p = allPosseder.find((p) => p.id_reponse === id);
                    if (!p || !p.isCorrect) {
                        isCorrect = false;
                        break;
                    }
                }

                if (isCorrect) {
                    correctCount++;
                }

                detailedResults.push({
                    questionId,
                    questionText: question.text || "Question introuvable",
                    selectedResponseIds,
                    isCorrect,
                    responses,
                });
            }

            const partieId = identifier.uuidV4();

            await Partie.create({
                id: partieId,
                score: correctCount,
                id_user: userId,
            });

            for (const { questionId, selectedResponseIds } of detailedResults) {
                for (const responseId of selectedResponseIds) {
                    await Contenir.create({
                        id_partie: partieId,
                        id_question: questionId,
                        id_reponse: responseId,
                    });
                }
            }

            return c.json(
                {
                    score: correctCount,
                    total: detailedResults.length,
                    partieId,
                    details: detailedResults,
                },
                200
            );
        } catch (err) {
            console.error("💥 Erreur serveur :", err);
            return c.json({ error: "Erreur serveur" }, 500);
        }
    }

    async stats(c: Context) {
        try {
            const userId = c.get("userId"); // Changé de user.username à userId

            if (!userId) {
                return c.json({ error: "Utilisateur non authentifié." }, 401);
            }

            const parties = await Partie.findAll({
                where: { id_user: userId }, // Changé de username à userId
                include: [
                    {
                        model: Contenir,
                        as: "contenus",
                    },
                ],
            });

            if (parties.length === 0) {
                return c.json(
                    { message: "Aucune partie trouvée pour ce joueur." },
                    404
                );
            }

            const totalParties = parties.length;
            const totalScore = parties.reduce((acc, p) => acc + p.score, 0);
            const bestScore = Math.max(...parties.map((p) => p.score));
            const totalQuestions = totalParties * 15;
            const precision =
                totalQuestions > 0 ? (totalScore / totalQuestions) * 100 : 0;

            // Récupérer le username pour l'affichage
            const user = await User.findOne({ where: { id: userId } });

            return c.json(
                {
                    username: user?.username || "Inconnu",
                    totalParties,
                    totalScore,
                    bestScore,
                    totalQuestions,
                    precision: `${precision.toFixed(1)}%`,
                },
                200
            );
        } catch (err) {
            return c.json({ error: "Erreur serveur" }, 500);
        }
    }

    async history(c: Context) {
        try {
            const userId = c.get("userId");

            if (!userId) {
                return c.json({ error: "Utilisateur non authentifié." }, 401);
            }

            const parties = await Partie.findAll({
                where: { id_user: userId },
                include: [{ model: Contenir, as: "contenus" }],
            });

            return c.json(parties, 200);
        } catch (err) {
            return c.json({ error: "Erreur serveur" }, 500);
        }
    }

    async all(c: Context) {
        try {
            const parties = await Partie.findAll({
                include: [
                    {
                        model: User,
                        attributes: ["username", "name", "firstname", "image"],
                    },
                    {
                        model: Contenir,
                        as: "contenus",
                    },
                ],
            });

            const modules = await Module.findAll({
                include: [
                    {
                        model: Theme,
                        as: "theme",
                        attributes: ["id", "name"],
                    },
                ],
                attributes: ["id", "name"],
            });

            return c.json(
                {
                    parties,
                    modules,
                },
                200
            );
        } catch (err) {
            return c.json({ error: "Erreur serveur" }, 500);
        }
    }
}

export const partieController = new PartieController();
