# 📘 Time – Utilitaires de gestion et formatage du temps

Classe utilitaire pour manipuler facilement les dates, faire des pauses, calculer des différences, et formater des dates.

# 🔧 Méthodes disponibles

## now()

```ts
now(): Date
```

Retourne la date et l’heure actuelles (new Date()).

## timestamp()

```ts
timestamp(): number
```

Retourne le timestamp actuel en millisecondes (équivalent à Date.now()).

## sleep(ms)

```ts
sleep(ms: number): Promise<void>
```

Pause l’exécution async pendant ms millisecondes.

## addDays(date, days)

```ts
addDays(date: Date, days: number): Date
```

Retourne une nouvelle date avec days jours ajoutés à date.

## subMinutes(date, minutes)

```ts
subMinutes(date: Date, minutes: number): Date
```

Retourne une nouvelle date avec minutes minutes retirées de date.

## format(date, fmt)

```ts
format(date: Date, fmt = "iso"): string
```

Formate un objet Date en chaîne de caractères selon le format spécifié.
Format Description Exemple
"iso" Format ISO 8601 complet 2025-05-15T14:35:22.123Z
"YYYY-MM-DD HH:mm:ss" Date et heure au format anglais classique 2025-05-15 14:35:22
"DD/MM/YYYY" Date au format français (jour/mois/année) 15/05/2025
"YYYY-MM-DD" Date au format anglais (année-mois-jour) 15-05-2025 (attention, format non standard pour cette syntaxe, souvent c’est 2025-05-15)
"HH:mm:ss" Heure complète (heures:minutes:secondes) 14:35:22
"HH:mm" Heure simplifiée (heures:minutes) 14:35
Autre Retourne la chaîne par défaut de date.toString() Thu May 15 2025 14:35:22 GMT+0200 (Central European Summer Time)
| Format | Description | Exemple |
| ------------------------ | --------------------------- | ----------------- |
| `iso` | Format ISO 8601 complet | `2025-05-15T14:35:22.123Z` |
| `YYYY-MM-DD HH:mm:ss` | Date et heure au format anglais classique | `2025-05-15 14:35:22` |
| `DD/MM/YYYY` | Date au format français (jour/mois/année) | `15/05/2025` |
| `YYYY-MM-DD` | Date au format anglais (année-mois-jour) | `2025-05-15` |
| `HH:mm:ss` | Heure complète (heures:minutes:secondes) | `14:35:22` |
| `HH:mm` | Heure simplifiée (heures:minutes) | `14:35` |
| `Autre` | Retourne la chaîne par défaut de `date.toString()` | `Thu May 15 2025 14:35:22 GMT+0200 (Central European Summer Time)` |

## diffInMinutes(a, b)

```ts
diffInMinutes(a: Date, b: Date): number
```

Retourne la différence absolue entre les dates a et b en minutes.

## isPast(date)

```ts
isPast(date: Date): boolean
```

Retourne true si date est antérieure à maintenant, sinon false.

# 💡 Exemples d’utilisation

```ts
import { time } from "./time";

console.log(time.now()); // Date actuelle
console.log(time.timestamp()); // Timestamp actuel

await time.sleep(1000); // Pause 1s

const future = time.addDays(new Date(), 7);
console.log(time.format(future, "YYYY-MM-DD HH:mm:ss"));

const diff = time.diffInMinutes(new Date(), future);
console.log(`Différence en minutes : ${diff}`);

console.log(time.isPast(new Date("2000-01-01"))); // true
```
