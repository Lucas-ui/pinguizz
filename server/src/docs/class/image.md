# 🖼️ Image – Gestion des images

Classe utilitaire pour manipuler des images de manière simple, performante et modulaire : redimensionnement, compression, conversion, extraction de métadonnées, etc.

## 🔧 Méthodes disponibles

### resize

```ts
resize(inputPath: string, outputPath: string, width: number, height: number): Promise<void>
```

Redimensionne l’image d’entrée tout en gardant le ratio (fit: inside).

### convert

```ts
convert(inputPath: string, outputPath: string, format: "jpeg" | "png" | "webp" | "avif"): Promise<void>
```

Convertit l’image vers un autre format.

### compressJpeg

```ts
compressJpeg(inputPath: string, outputPath: string, quality?: number): Promise<void>
```

Compresse une image JPEG avec la qualité spécifiée (défaut : 80).

### compressPng

```ts
compressPng(inputPath: string, outputPath: string, quality?: number): Promise<void>
```

Compresse une image PNG (niveau maximal par défaut).

### getMetadata

```ts
getMetadata(inputPath: string): Promise<sharp.Metadata>
```

Retourne les métadonnées de l’image (taille, format, exif, etc.).

### generateThumbnail

```ts
generateThumbnail(inputPath: string, outputPath: string, size?: number): Promise<void>
```

Crée une miniature carrée (fit: cover) de l’image (par défaut : 150×150).

### isImage

```ts
isImage(filePath: string): Promise<boolean>
```

Vérifie si le fichier est une image valide parmi les formats connus (jpeg, png, webp, gif, avif...).

### toBase64

```ts
toBase64(inputPath: string): Promise<string>
```

Encode l’image en chaîne base64, prête à être utilisée dans un tag <img> HTML.

## 💡 Exemples d’utilisation

```ts
import { imageManager } from "./image";

await imageManager.resize("input.jpg", "output.jpg", 800, 600);

await imageManager.convert("photo.png", "photo.webp", "webp");

await imageManager.compressJpeg("input.jpg", "compressed.jpg");

const meta = await imageManager.getMetadata("input.jpg");
console.log(meta.format, meta.width, meta.height);

const isValid = await imageManager.isImage("avatar.gif");

const base64 = await imageManager.toBase64("logo.png");
```

## 📦 Dépendances

-   sharp
