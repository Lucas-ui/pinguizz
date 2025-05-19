# Documentation - Transactions Sequelize

## Pourquoi une transaction ?

Pour garantir l'intégrité des données lors d’opérations complexes.  
Si une étape échoue, on annule toutes les modifications (rollback).

## Méthode `withTransaction`

La classe Database fournit une méthode `withTransaction` qui :

-   Lance une transaction
-   Exécute un callback avec la transaction active
-   Commit si succès, rollback si erreur

## Exemple simple

```ts
await db.withTransaction(async (sequelize, transaction) => {
  // utiliser transaction dans tes requêtes
  await Model.create({ ... }, { transaction });
});
```

Quand utiliser ?

-   Opérations multi-requêtes qui doivent être atomiques

-   Modification liée de plusieurs tables
