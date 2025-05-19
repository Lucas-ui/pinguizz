# Documentation - Migrations Sequelize

## Qu'est-ce qu'une migration ?

Une migration est un script permettant de versionner les modifications de la base de données (ajout de tables, modification de colonnes, etc.).

## Pourquoi utiliser les migrations ?

-   Garder l’historique des modifications DB
-   Faciliter le déploiement et la synchronisation entre environnements
-   Permettre un rollback des modifications si besoin

## Outils courants

-   `sequelize-cli` (outil officiel)
-   `umzug` (gestionnaire de migrations utilisé souvent avec Sequelize)

## Workflow typique

1. Créer une migration

```bash
    npx sequelize-cli migration:generate --name nom_de_la_migration
```

2. Écrire les changements dans la migration (up/down)
3. Appliquer la migration

```bash
    npx sequelize-cli db:migrate
```

4. En cas de problème, rollback

```bash
    npx sequelize-cli db:migrate:undo
```

Structure d'une migration

```ts
module.exports = {
    up: async (queryInterface, Sequelize) => {
        // création/modification tables
    },
    down: async (queryInterface, Sequelize) => {
        // rollback des changements
    },
};
```
