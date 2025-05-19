# Documentation - Pool de connexions Sequelize

## Concept

Un pool de connexions maintient plusieurs connexions ouvertes à la base, permettant de réutiliser ces connexions au lieu d'en ouvrir une nouvelle à chaque requête.

## Paramètres importants

| Paramètre | Description                                         |
| --------- | --------------------------------------------------- |
| max       | Nombre maximal de connexions simultanées            |
| min       | Nombre minimal de connexions ouvertes               |
| acquire   | Durée max (ms) pour obtenir une connexion           |
| idle      | Durée (ms) avant fermeture d’une connexion inactive |

## Avantages

-   Réduction du temps d’ouverture/fermeture des connexions
-   Amélioration des performances sous charge
-   Gestion concurrente des accès à la DB

## Indicateurs de saturation

-   Requêtes qui attendent trop longtemps pour une connexion
-   Connexions actives toujours au max
-   Erreurs d’acquisition timeout

## Monitoring

-   Utiliser `SHOW PROCESSLIST` sur MySQL pour voir connexions actives
-   Logger le temps d’acquisition dans Sequelize
-   Outils externes (PM2, New Relic, etc.)

---
