# 📦 Cache – Gestion simple de cache en mémoire avec expiration TTL

Classe utilitaire pour stocker et récupérer des valeurs en mémoire, avec possibilité d'expiration automatique.

---

## 🔧 Méthodes disponibles

### set(key: string, value: any, ttlMs?: number): void

Stocke une valeur associée à une clé.  
Optionnellement, définit un temps de vie (TTL) en millisecondes après lequel la valeur est automatiquement supprimée.

**Paramètres :**

-   `key` : Clé unique pour accéder à la valeur.
-   `value` : Valeur à stocker.
-   `ttlMs` _(optionnel)_ : Durée de vie en millisecondes.

---

### get<T>(key: string): T \| undefined

Récupère la valeur associée à la clé.  
Retourne `undefined` si la clé n'existe pas ou si la valeur a expiré.

**Paramètres :**

-   `key` : Clé de la valeur à récupérer.

---

### has(key: string): boolean

Indique si une valeur existe pour la clé et n’a pas expiré.

---

### delete(key: string): void

Supprime la valeur associée à la clé.

---

### clear(): void

Vide entièrement le cache.

---

## 💡 Exemples d’utilisation

```ts
cache.set("user_123", { name: "Alice" }, 60000); // 1 minute TTL

const user = cache.get<{ name: string }>("user_123");
if (user) {
    console.log(user.name); // Alice
}

console.log(cache.has("user_123")); // true

cache.delete("user_123");

cache.clear();
```
