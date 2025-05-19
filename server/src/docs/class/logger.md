# 📝 Logger – Gestion centralisée des logs avec Winston

Utilise `winston` et `winston-daily-rotate-file` pour créer des logs journaliers, organisés par type, avec une sortie console colorée pour le debug local.

## ⚙️ Configuration

```ts
import { logger } from "./logger";

logger.loggerApi.info("API démarrée");
logger.loggerConsole.debug("Mode développement actif");
```

La classe utilise un singleton via Logger.getInstance() pour garantir une instance unique dans l'application.

## 📂 Structure des logs

Les fichiers sont créés dans :
./logs/{nom_du_logger}/YYYY-MM-DD.log

    Rotation quotidienne

    Taille max : 10 MB

    Rétention : 7 jours

## 🔧 Loggers disponibles

### 📁 logger.loggerApi

Log de type info pour les appels ou événements liés à l'API REST.

### 🔐 logger.loggerAuth

Log des activités liées à l'authentification.

### 🗃️ logger.loggerSequelize

Log des requêtes SQL ou interactions avec la BDD.

### 🖥️ logger.loggerConsole

Log en console locale (niveau debug), formaté et colorisé.

## 📌 Exemple complet

```ts
logger.loggerApi.info("Nouvelle requête GET /users");
logger.loggerAuth.warn("Tentative de connexion échouée");
logger.loggerSequelize.error("Erreur de connexion DB");

logger.loggerConsole.debug("Serveur lancé sur le port 3000");
```

## 📦 Dépendances

-   winston
-   winston-daily-rotate-file
-   path (natif)
