import { Hono } from "hono";
import { authController } from "../controllers/auth";
import { validate } from "../docs/middlewares/validate";
import { userSchema, registerSchema } from "../validators/user";
import { authentification } from "../docs/middlewares/auth";

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentification des utilisateurs
 */
export const router = new Hono();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Inscrire un nouvel utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       200:
 *         description: Inscription réussie
 *       500:
 *         description: Erreur lors de la création de l'utilisateur
 */
router.post("/register", validate(registerSchema), authController.register);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Récupérer le profil de l'utilisateur connecté
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Informations du profil de l'utilisateur connecté
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
router.get("/me", authentification, authController.profil);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Se connecter avec un utilisateur existant
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Connexion réussie, un cookie avec le token est renvoyé
 *       400:
 *         description: Identifiants incorrects
 *       500:
 *         description: Erreur lors de la connexion
 */
router.post("/signin", validate(userSchema), authController.signin);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Se déconnecter (réinitialiser le cookie)
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 *       401:
 *         description: Non connecté ou token invalide
 *       500:
 *         description: Erreur lors de la déconnexion
 */
router.post("/logout", authentification, authController.logout);

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterRequest:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Nom de l'utilisateur (doit être unique)
 *         password:
 *           type: string
 *           description: Mot de passe de l'utilisateur (doit contenir au moins 10 caractères)
 *       required:
 *         - username
 *         - password
 *
 *     LoginRequest:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Nom de l'utilisateur
 *         password:
 *           type: string
 *           description: Mot de passe de l'utilisateur
 *       required:
 *         - username
 *         - password
 *
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
