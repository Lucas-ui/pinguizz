# Documentation - Classe Database

## Présentation générale

Singleton qui gère la connexion à la base de données MySQL via Sequelize.  
Initialise la connexion, configure le pool, les logs, les modèles.  
Gère aussi la fermeture propre de la connexion.
La classe `Database` gère la connexion à la base de données MySQL via Sequelize.  
Elle utilise un pool de connexions pour optimiser les performances et éviter d'ouvrir/fermer une connexion à chaque requête.  
Elle supporte aussi la gestion des transactions.

---

## Pool de connexions

Le pool permet de maintenir un nombre limité de connexions ouvertes à la base, réutilisables pour plusieurs requêtes.  
Cela évite le coût élevé d'ouverture/fermeture de connexion à chaque appel.

### Paramètres du pool dans la classe

-   `max`: nombre maximal de connexions simultanées (ex: 10)
-   `min`: nombre minimal de connexions maintenues ouvertes
-   `acquire`: délai max (en ms) pour acquérir une connexion avant timeout
-   `idle`: délai (en ms) avant fermeture d’une connexion inactive

### Pourquoi utiliser un pool ?

-   Améliore les performances en réduisant le temps de connexion
-   Permet de gérer plusieurs requêtes simultanées (concurrence)
-   Réduit la charge sur la base

### Comment savoir si augmenter la taille du pool ?

-   Beaucoup de requêtes attendent longtemps pour obtenir une connexion
-   Le nombre maximal de connexions est constamment atteint
-   Apparition d’erreurs `acquire timeout`
-   Monitoring via logs ou commandes SQL (`SHOW PROCESSLIST`)

---

## Transactions

La classe offre une méthode `withTransaction` pour exécuter un bloc de code dans une transaction Sequelize.

### Fonctionnement

-   Démarre une transaction avant d'exécuter le callback
-   Si le callback réussit, commit la transaction
-   Si erreur, rollback la transaction

### Exemple simple

```ts
await db.withTransaction(async (sequelize, transaction) => {
    // tes requêtes avec `transaction` ici
});
```

### Quand utiliser ?

-   Lors d’opérations multi-étapes où la cohérence des données est importante
-   Pour s'assurer que toutes les requêtes réussissent ou s'annulent ensemble

## Méthodes principales

```ts
initialize();
```

-   Initialise la connexion Sequelize si elle n'existe pas encore

-   Configure le pool, le logging, et initialise les modèles

-   Teste la connexion

```ts
close();
```

-   Ferme la connexion Sequelize et libère les ressources

-   À appeler lors de la fermeture de l’application pour éviter fuite

```ts
logPoolStats();
```

-   Récupère et log les statistiques du pool (nombre connexions actives, config)

-   Utile pour monitorer l'état en production

```ts
withTransaction(callback);
```

-   Exécute callback dans une transaction Sequelize

-   Gère commit ou rollback automatiquement

## Exemple d’utilisation

```ts
import db from "./Database";

async function example() {
    const sequelize = await db.initialize();

    await db.withTransaction(async (sequelize, transaction) => {
        // opérations avec transaction
    });

    await db.logPoolStats();

    // à la fermeture du serveur
    await db.close();
}
```
