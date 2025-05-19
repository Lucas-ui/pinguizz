# 📘 Identifier – Générateur & validateur d'identifiants

Classe utilitaire pour générer différents types d'identifiants sécurisés : UUID, tokens, slugs lisibles, nanoID, etc.

# 🔧 Méthodes disponibles

## uuidV4

```ts
uuidV4(): string
```

Génère un UUID version 4 (aléatoire).

## uuidV7

```ts
uuidV7(): string
```

Génère un UUID version 7 (basé sur le temps, lexicographiquement triable).

## isValidUUID

```ts
isValidUUID(uuid: string): boolean
```

Vérifie si la chaîne est un UUID valide (toute version confondue).

## isUUIDv4

```ts
isUUIDv4(uuid: string): boolean
```

Renvoie true si le UUID donné est de version 4.

## isUUIDv7

```ts
isUUIDv7(uuid: string): boolean
```

Renvoie true si le UUID donné est de version 7.

## generateToken

```ts
generateToken(length?: number, encoding?: "hex" | "base64"): string
```

Génère un token sécurisé via crypto.randomBytes.

-   length : Longueur des octets (par défaut 16)

-   encoding : "hex" ou "base64" (par défaut "hex")

## generateBase62Token

```ts
generateBase62Token(length?: number): string
```

Génère un token composé uniquement de caractères alphanumériques (a-z, A-Z, 0-9).

Utile pour :

-   URLs

-   Codes lisibles par l’humain

-   Slugs

## generateNanoId

```ts
generateNanoId(length?: number): string
```

Génère un identifiant court, unique et URL-safe via nanoid.

Par défaut : 21 caractères.

## generateSlug

```ts
generateSlug(options?: { prefix?: string; timestamp?: boolean }): string
```

Crée un ID lisible structuré avec :

-   un préfixe (user, log, etc.)

-   un timestamp facultatif (20250515)

-   un identifiant court (base62)

Exemple : user_20250515_abCDeFgH

## generateTokenSet

```ts
generateTokenSet(): {
uuid: string;
shortId: string;
token: string;
slug: string;
}
```

Génère un "set" d'identifiants prêt à l'emploi avec :

-   uuid : UUIDv7
-   shortId : NanoID
-   token : token hex de 32 octets
-   slug : format structuré avec date

## Exemples d’utilisation

```ts
import identifier from "@/class/identifier";

const id = identifier.uuidV7();
const token = identifier.generateToken(32);
const nano = identifier.generateNanoId();
const slug = identifier.generateSlug({ prefix: "user", timestamp: true });

if (identifier.isUUIDv7(id)) {
    console.log("UUID v7 détecté");
}

const set = identifier.generateTokenSet();
console.log(set.slug); // ex: "id_20250515_XYZ123abc"
```

## 📦 Dépendances

-   uuid

-   nanoid

-   crypto (natif Node.js)
