# StatsTracker

## 📌 Description

`StatsTracker` est un middleware compatible Hono qui intercepte chaque requête HTTP.  
Il mesure la durée d'exécution et le code de réponse, puis délègue l'enregistrement des données à un `MetricsCollector`.

## 🔗 Dépendances

- Nécessite une instance de `MetricsCollector` passée en argument.

## 🛠️ Fonctionnement

```ts
import { StatsTracker } from './classes/statsTracker';
import { MetricsCollector } from './classes/metricsCollector';

const metrics = new MetricsCollector();

app.use('*', StatsTracker(metrics));

À chaque requête :

    StatsTracker démarre un chronomètre.

    La requête est traitée (await next()).

    Il mesure la durée et récupère le status HTTP.

    Il appelle collector.track() avec ces infos.

🎯 Pourquoi l'utiliser ?

    100% transparent pour tes routes, aucune modification nécessaire.

    Te permet d’avoir des statistiques précises sur l’utilisation de ton API.

    Composable avec d’autres middlewares Hono.

    T’assure une architecture propre : séparation nette entre collecte et traitement.
