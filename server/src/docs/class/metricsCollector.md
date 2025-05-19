# MetricsCollector

## 📌 Description

La classe `MetricsCollector` est un composant central de collecte de métriques pour ton application Hono/Bun.  
Elle enregistre des statistiques sur les requêtes HTTP, comme :

- le nombre total de requêtes par endpoint,
- le temps de traitement cumulé,
- le taux d’erreurs (statuts `4xx` ou `5xx`).

## 🛠️ Fonctionnalités

- **track(path, duration, status)** : enregistre une nouvelle requête.
- **getStats()** : retourne un résumé statistique par endpoint (nombre, temps moyen, taux d'erreur).
- **reset()** : remet les compteurs à zéro.

## ✅ Exemple d'utilisation

```ts
const metrics = new MetricsCollector();

metrics.track('/login', 120.5, 200);
metrics.track('/login', 98.1, 500);

console.log(metrics.getStats());
/*
{
  "/login": {
    count: 2,
    averageTime: 109.3,
    errorRate: 0.5
  }
}
*/
