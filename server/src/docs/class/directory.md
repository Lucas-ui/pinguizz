# 📁 Directory – Gestion dynamique des fichiers et dossiers

Classe utilitaire pour la manipulation avancée du système de fichiers via `fs/promises` et `path`.

Permet la lecture, l'écriture, la suppression, la gestion JSON, les métadonnées, etc. depuis un `basePath` configurable.

## 📌 Configuration

```ts
const dir = new Directory(); // Utilise process.cwd() par défaut
const dir = new Directory("/chemin/perso"); // Base personnalisée
```

## 🛠️ Méthodes disponibles

## 📍 Résolution de chemins

```ts
resolve(...segments: string[]): string
```

Construit un chemin absolu basé sur basePath.

```ts
ensureExtension(filePath: string, ext?: string): string
```

Ajoute une extension au fichier s’il n’en a pas (ex: .txt).

## 📄 Gestion de fichiers

```ts
createFile(filePath: string, content = "", ext?: string): Promise<void>
```

Crée un fichier avec contenu, et dossier parent si nécessaire.

```ts
readFile(filePath: string): Promise<string>
```

Lit le contenu d’un fichier texte.

```ts
writeFile(filePath: string, content: string): Promise<void>
```

Écrit (ou remplace) le contenu d’un fichier texte (utf-8).

```ts
async writeBinaryFile(filePath: string, content: Buffer): Promise<void> {
        const full = this.resolve(filePath);
        await fs.mkdir(path.dirname(full), { recursive: true });
        await fs.writeFile(full, content);
    }
```

Écrit (ou remplace) le contenu d’un fichier binaire (images, PDF, etc.).

```ts
appendToFile(filePath: string, content: string): Promise<void>
```

Ajoute du contenu à la fin d’un fichier.

```ts
deleteFile(filePath: string): Promise<void>
```

Supprime un fichier.

```ts
renderTemplate(templatePath: string, variables: Record<string, any>): Promise<string>
```

Lit un fichier template et remplace les placeholders {{ key }} par les valeurs correspondantes dans l’objet variables.

```ts
getTemplatePath(templateName: string): string
```

Renvoie le chemin complet vers un template situé dans le dossier templates à partir du basePath.

## 📦 JSON helpers

```ts
readJson(filePath: string): Promise<any>
```

Lit un fichier .json et parse le contenu.

```ts
writeJson(filePath: string, data: any): Promise<void>
```

Sérialise un objet et l’écrit dans un fichier JSON.

## 📂 Dossiers

```ts
createFolder(folderPath: string): Promise<void>
```

Crée un dossier (et ses parents si besoin).

```ts
deleteFolder(folderPath: string): Promise<void>
```

Supprime un dossier récursivement.

```ts
listFiles(folderPath: string): Promise<string[]>
```

Liste les fichiers/dossiers dans un dossier donné.

## 🧰 Utilitaires

```ts
exists(pathToCheck: string): Promise<boolean>
```

Vérifie si un chemin existe (fichier ou dossier).

```ts
moveFile(from: string, to: string): Promise<void>
```

Déplace un fichier.

```ts
copyFile(from: string, to: string): Promise<void>
```

Copie un fichier.

## 🧾 Métadonnées

```ts
getMetadata(path: string): Promise<{...}>
```

Renvoie :

- size: Taille en octets

- createdAt: Date de création

- modifiedAt: Dernière modification

- isFile, isDirectory: Booléens

## 💡 Exemples

await directory.createFile("data/test.txt", "Bonjour le monde");
const json = await directory.readJson("config/settings.json");
await directory.moveFile("old.txt", "backup/old.txt");

## 📦 Dépendances

- fs/promises

- path (standard Node.js)
