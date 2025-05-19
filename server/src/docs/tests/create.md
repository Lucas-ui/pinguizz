# ✍️ Écrire des Tests avec Vitest (Exemple Complet)

Ce guide explique **comment écrire un test unitaire clair et maintenable** avec [Vitest](https://vitest.dev), en prenant comme exemple réel un **contrôleur utilisateur** dans une architecture MVC.

## 📂 Exemple testé : `userController.get`

On suppose que tu as un contrôleur `userController` avec une méthode `.get(ctx)` qui retourne un utilisateur à partir de son ID, extrait du contexte.

## 🧪 Exemple de test complet

```ts
import { userController } from "../../../src/controllers/user";
import { User } from "../../../src/models/user";

// On remplace le vrai module par un faux
vi.mock("../../../src/models/user");

describe("UserController", () => {
    // Faux ctx retourné à la fonction .get
    const mockJson = vi.fn();
    const mockCtx = {
        get: vi.fn().mockImplementation((key) => {
            if (key === "userId") return 1;
        }),
        json: mockJson,
    } as any;

    // Nettoyer les mocks après chaque test
    afterEach(() => {
        vi.clearAllMocks();
    });

    test("get() should fetch user by ID", async () => {
        const fakeUser = { id: 1, username: "test" };

        // Simulation de la réponse de User.findByPk
        (User.findByPk as any).mockResolvedValue(fakeUser);

        // Appel de la méthode testée
        await userController.get(mockCtx);

        // Vérifications : la méthode a été appelée avec le bon ID
        expect(User.findByPk).toHaveBeenCalledWith(1);

        // Le contrôleur a bien renvoyé la réponse via ctx.json
        expect(mockJson).toHaveBeenCalledWith(fakeUser);
    });
});
```

## 🧠 Décomposition & explication

1. vi.mock(...)

```ts
vi.mock("../../../src/models/user");
```

Cette ligne intercepte les imports de User pour permettre de remplacer ses méthodes (comme findByPk) par des fonctions simulées (mockResolvedValue, etc.).

2. mockCtx : simuler le contexte

```ts
const mockCtx = {
    get: vi.fn().mockImplementation((key) => {
        if (key === "userId") return 1;
    }),
    json: mockJson,
};
```

Ici, on simule l’objet ctx, typique d’un framework HTTP (comme Hono/Koa).

```ts
ctx.get("userId"); // retourne un ID fixe : 1.
```

```ts
ctx.json(...) // est une fonction factice (vi.fn()) pour capturer la réponse.
```

3. mockResolvedValue(...)

```ts
(User.findByPk as any).mockResolvedValue(fakeUser);
```

On simule une réponse async de Sequelize ici :

-   findByPk est une méthode d’accès DB.

-   On la force à retourner un faux utilisateur (fakeUser).

4. Appel de la méthode réelle

```ts
await userController.get(mockCtx);
```

C’est l’appel réel que tu veux tester.

Tu lui passes un ctx simulé, et tu regardes ce qu’il appelle et ce qu’il retourne.

5. expect(...) : les assertions

```ts
expect(User.findByPk).toHaveBeenCalledWith(1);
expect(mockJson).toHaveBeenCalledWith(fakeUser);
```

-   ✅ On vérifie que la méthode findByPk a été appelée avec le bon ID.

-   ✅ On vérifie que ctx.json(...) a renvoyé les bonnes données.

## 🔁 Nettoyage avec afterEach

```ts
afterEach(() => {
    vi.clearAllMocks();
});
```

Cela évite les effets de bord entre tests : tous les vi.fn() sont réinitialisés.

## 📌 Résumé : points clés à retenir

-   ✅ Mocker les dépendances avec vi.mock(...).

-   ✅ Simuler le contexte (ctx) si ton contrôleur dépend d'un framework HTTP.

-   ✅ Remplacer les méthodes DB avec mockResolvedValue(...) ou mockReturnValue(...).

-   ✅ Vérifier les effets (résultats, appels, etc.) avec expect(...).

-   ✅ Nettoyer les mocks après chaque test pour éviter les conflits.

## 🧪 Autres techniques utiles

### ❗ Tester les erreurs

```ts
(User.findByPk as any).mockRejectedValue(new Error("DB error"));

await expect(() => userController.get(mockCtx)).rejects.toThrow("DB error");
```

### 🧰 Mocker plusieurs méthodes

```ts
vi.mock("../../../src/services/email", () => ({
    sendEmail: vi.fn(),
    sendResetCode: vi.fn(),
}));
```

## 📚 Liens utiles

-   Vitest - API Mocking

-   Vitest - Expect Matchers

-   Guide officiel Vitest
