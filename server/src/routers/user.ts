import { Hono } from "hono";
import { validate } from "../middlewares/validate";
import { userSchema } from "../validators/user";
import { userController } from "../controllers/user";
import { authentification } from "../middlewares/auth";

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Gestion des utilisateurs
 */
export const router = new Hono();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupérer les informations de l'utilisateur connecté
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Informations de l'utilisateur connecté
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *       401:
 *         description: Non autorisé, token manquant ou invalide
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/", authentification, userController.get);

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Mettre à jour les informations de l'utilisateur connecté
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nouveau nom d'utilisateur
 *             required:
 *               - username
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *       400:
 *         description: Données invalides, vérifiez le format de l'utilisateur
 *       401:
 *         description: Non autorisé, token manquant ou invalide
 *       500:
 *         description: Erreur interne du serveur
 */
router.put("/", authentification, validate(userSchema), userController.update);

/**
 * @swagger
 * /users:
 *   delete:
 *     summary: Supprimer le compte de l'utilisateur connecté
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *       401:
 *         description: Non autorisé, token manquant ou invalide
 *       500:
 *         description: Erreur interne du serveur
 */
router.delete("/", authentification, userController.delete);
