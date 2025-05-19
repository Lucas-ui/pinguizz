# 🔐 Cipher – Chiffrement AES sécurisé

Classe utilitaire pour chiffrer et déchiffrer des chaînes de caractères en utilisant AES-256-CBC. Elle fournit également des outils de génération de clé, IV, et de vérification.

---

## 📦 Fonctions principales

```ts
generateKey(seed: string): Buffer`
```

Génère une clé AES-256 à partir d'une graine de type string (mot de passe, ID, etc.).

---

```ts
generateRandomKey(): Buffer`
```

Génère une clé AES-256 totalement aléatoire.

---

```ts
generateIV(): Buffer`
```

Génère un IV (vecteur d'initialisation) de 16 octets (128 bits).

---

```ts
encrypt(plaintext: string, key: Buffer): string`
```

Chiffre une chaîne avec AES-256-CBC et un IV aléatoire.  
**Retourne :** `ivHex:dataHex`

---

```ts
decrypt(cipherText: string, key: Buffer): string`
```

Déchiffre un texte au format `ivHex:dataHex` avec la clé donnée.

---

```ts
encryptWithIV(plaintext: string, key: Buffer, iv: Buffer): string`
```

Chiffre avec un IV personnalisé (utile pour compatibilité ou test).  
**Retourne :** hex string

---

```ts
decryptWithIV(encryptedHex: string, key: Buffer, iv: Buffer): string`
```

Déchiffre un texte chiffré en hex avec un IV donné.

---

```ts
isValidEncryptedString(input: string): boolean`
```

Vérifie si une chaîne suit le format `iv:data` d’un chiffrement AES valide.

---

```ts
safeCompare(a: string, b: string): boolean`
```

Compare deux chaînes (ou Buffer) de manière sécurisée pour éviter les attaques temporelles.

---

## 💡 Exemple d’utilisation

```ts
import { cipher } from "@/utils/cipher";

const key = cipher.generateKey("my-passphrase");

const encrypted = cipher.encrypt("Données sensibles", key);
console.log("Chiffré:", encrypted);

const decrypted = cipher.decrypt(encrypted, key);
console.log("Déchiffré:", decrypted);
```

## 🔐 Format de sortie

Le format utilisé pour encrypt() est :

`ivHex`:`dataHex`

```txt
Exemple :   ff13a0c9931d2be1f02ecad89f0e2fdc:c2eb5c29ad1f...
```

## 📦 Dépendances

-   crypto
