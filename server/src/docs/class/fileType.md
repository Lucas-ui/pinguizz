# 📂 FileType – Détection et gestion des types de fichiers

Classe utilitaire pour détecter le type MIME d’un fichier ou d’un buffer, récupérer l’extension associée, et identifier certains types courants comme images ou PDF.

---

## 🔧 Méthodes disponibles

### async detectMimeFromBuffer(buffer: Buffer): Promise<string \| null>

Détecte le type MIME d’un contenu binaire (buffer).  
Retourne le type MIME en chaîne de caractères ou `null` si indétectable.

**Paramètres :**

-   `buffer` : Contenu binaire à analyser.

---

### async detectMimeFromFile(filePath: string): Promise<string \| null>

Lit un fichier et détecte son type MIME.  
Retourne le type MIME ou `null` si erreur ou indétectable.

**Paramètres :**

-   `filePath` : Chemin vers le fichier.

---

### getExtensionFromMime(mimeType: string): string \| null

Retourne l’extension associée à un type MIME donné, ou `null` si inconnue.

**Paramètres :**

-   `mimeType` : Type MIME (ex: `"image/png"`).

---

### isImage(mimeType: string): boolean

Indique si un type MIME correspond à une image.

---

### isPdf(mimeType: string): boolean

Indique si un type MIME correspond à un fichier PDF.

---

## 💡 Exemples d’utilisation

```ts
const mimeType = await fileType.detectMimeFromFile("photo.jpg");
console.log(mimeType); // ex: "image/jpeg"

const ext = fileType.getExtensionFromMime(mimeType || "");
console.log(ext); // ex: "jpg"

if (mimeType && fileType.isImage(mimeType)) {
    console.log("C'est une image !");
}

if (mimeType === "application/pdf" && fileType.isPdf(mimeType)) {
    console.log("C'est un PDF");
}
```

## 📦 Dépendances

-   file-type
-   mime-types
-   fs/promises
