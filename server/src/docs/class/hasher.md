# 🔐 Hasher – Gestion des algorithmes de hachage sécurisés

Classe utilitaire regroupant trois algorithmes de hachage reconnus : **bcrypt**, **argon2**, **scrypt**.

Permet de générer, comparer et reconnaître des hashes, avec une interface simple, tout en personnalisant les paramètres via les variables d’environnement.

## ⚙️ Configuration (via `.env`)

| Clé `.env`               | Description                 | Valeur par défaut |
| ------------------------ | --------------------------- | ----------------- |
| `BCRYPT_ROUNDS`          | Coût de hashage pour bcrypt | `10`              |
| `ARGON2_MEMORY`          | Mémoire utilisée (en KB)    | `65536` (`2^16`)  |
| `ARGON2_TIME`            | Nombre d’itérations (temps) | `3`               |
| `ARGON2_PARALLELISM`     | Nombres de threads          | `1`               |
| `SCRYPT_KEYLEN`          | Longueur de la clé dérivée  | `64`              |
| `SCRYPT_COST`            | Coût de dérivation          | `16384`           |
| `SCRYPT_BLOCKSIZE`       | Taille de bloc              | `8`               |
| `SCRYPT_PARALLELIZATION` | Niveau de parallélisme      | `1`               |

---

## 🔧 Méthodes disponibles

### ✅ Interface simple

```ts
await hasher.hash("motDePasse", "argon2");
await hasher.compare("motDePasse", hash);
```

-   hash(value: string, algo?: "bcrypt" | "argon2" | "scrypt"): hache avec l'algo choisi.

-   compare(value: string, hash: string): détecte et vérifie automatiquement le bon algo.

### 🔐 Bcrypt

#### hash

```ts
bcryptHash(value: string): Promise<string>
```

Génère un hash avec bcrypt.

---

#### compare

```ts
bcryptCompare(value: string, hash: string): Promise<boolean>
```

Compare une valeur brute à son hash bcrypt.
isBcryptHash

```ts
isBcryptHash(value: string): boolean
```

Vérifie si un hash correspond au format bcrypt.

### ⚡ Argon2

#### hash

```ts
argon2Hash(value: string): Promise<string>
```

Génère un hash avec argon2id.

#### verify

```ts
argon2Verify(value: string, hash: string): Promise<boolean>
```

Vérifie une valeur contre un hash argon2.

#### isArgon2Hash

```ts
isArgon2Hash(value: string): boolean
```

Détecte si un hash est de type argon2.

### 🧪 Scrypt

#### hash

```ts
scryptHash(value: string, salt?: Buffer): string
```

Hache la valeur avec scrypt + un sel.

Format généré :

`saltHex`:`keyHex`

```txt
Exemple :   f734a0...:c1e0fcab0e...
```

#### verify

```ts
scryptVerify(value: string, stored: string): boolean
```

Vérifie la valeur avec le sel extrait du hash.

#### isScryptHash

```ts
isScryptHash(value: string): boolean
```

Détecte si un hash est du format scrypt (<hex>:<hex>).

## 💡 Exemples

```ts
const password = "superSecure123";

const bcrypt = await hasher.hash(password, "bcrypt");
const argon2 = await hasher.hash(password, "argon2");
const scrypt = await hasher.hash(password, "scrypt");

console.log(await hasher.compare(password, bcrypt)); // true
console.log(await hasher.compare(password, argon2)); // true
console.log(await hasher.compare(password, scrypt)); // true
```

## 📦 Dépendances

-   bcrypt
-   argon2
-   Node.js crypto (pour scrypt, randomBytes, timingSafeEqual)
