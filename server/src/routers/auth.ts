import { Hono } from "hono";
import { authController } from "../controllers/auth";
import { validate } from "../middlewares/validate";
import { userSchema, registerSchema } from "../validators/user";
import { authentification } from "../middlewares/auth";

export const router = new Hono();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Enregistrer un nouvel utilisateur
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - name
 *               - firstname
 *               - password
 *               - confirmPassword
 *             properties:
 *               username:
 *                 type: string
 *                 example: Pinguiz42
 *               name:
 *                 type: string
 *                 example: Dupont
 *               firstname:
 *                 type: string
 *                 example: Alice
 *               password:
 *                 type: string
 *                 example: SuperSecure123!
 *               confirmPassword:
 *                 type: string
 *                 example: SuperSecure123!
 *               isAdmin:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Erreur de validation
 *       500:
 *         description: Erreur serveur
 */
router.post("/register", validate(registerSchema), authController.register);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtenir le profil de l'utilisateur connecté
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Données du profil utilisateur
 *       401:
 *         description: Non autorisé
 */
router.get("/", authentification, authController.profil);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Connexion utilisateur
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: Pinguiz42
 *               password:
 *                 type: string
 *                 example: SuperSecure123!
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       400:
 *         description: Identifiants invalides
 *       500:
 *         description: Erreur serveur
 */
router.post("/login", validate(userSchema), authController.signin);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Déconnexion utilisateur
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur serveur
 */
router.post("/logout", authentification, authController.logout);
