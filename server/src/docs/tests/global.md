# 🧪 Guide des Tests - Exécution & Architecture

Ce document explique **comment exécuter les tests dans ce projet**, ainsi que l'architecture adoptée.

---

## 📁 Structure des tests

Les fichiers de test sont placés dans le dossier `tests/`, en suivant la structure suivante :

```txt
tests/
└── units/
└── controllers/
└── user.test.ts
```

Chaque fichier de test est nommé `*.test.ts` ou `*.spec.ts`.

---

## ⚙️ Lancement des tests

Les tests sont exécutés avec **Vitest**, installé comme dépendance de développement.

### ✅ Lancer tous les tests

```bash
bun run test
```

Cela exécute le script configuré dans package.json :

```ts
"scripts": {
    "test": "vitest"
}
```

### 🖥️ Interpréter le résultat des tests

Exemple de sortie :

```bash
✓ tests/units/controllers/user.test.ts (1 test) 2ms
✓ UserController > get() should fetch user by ID 2ms


Test Files 1 passed (1)
Tests 1 passed (1)
Duration 291ms
```

-   ✅ Chaque test est listé et marqué s’il passe ou échoue.

-   Résumé global : combien de fichiers et de tests ont passé.

### 🔁 Mode interactif : Watch Mode

Quand tu lances bun run test, Vitest entre en mode interactif :

```bash
PASS Waiting for file changes...
```

Cela signifie que dès que tu modifies un fichier source ou un test, il relance automatiquement les tests.

### 🧭 Commandes utiles dans ce mode

-   a → Rejoue tous les tests

-   t → Filtre les tests par nom

-   p → Filtre les tests par fichier

-   q → Quitte le mode interactif

-   h → Affiche l’aide

### 🛠️ Installer Vitest

```bash
bun add -d vitest
```
