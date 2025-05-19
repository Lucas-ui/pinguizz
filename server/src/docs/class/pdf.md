# 📄 Pdf – Générateur de fichiers PDF

Classe utilitaire permettant de générer des documents PDF à partir de texte ou de HTML.

Peut soit renvoyer le fichier en mémoire (Buffer), soit l’enregistrer dans le système de fichiers via la classe Directory.

## 🛠️ Méthodes disponibles

```ts
generateFromText(text: string): Promise<Buffer>
```

Crée un PDF simple contenant du texte brut.

- text : contenu texte à afficher dans le PDF.

Retourne un Buffer contenant le PDF.

```ts
generateFromHtml(html: string): Promise<Buffer>
```

Génère un PDF à partir d’un contenu HTML (via Puppeteer).

- html : string HTML complet à rendre.

Retourne un Buffer du PDF généré (format A4).

```ts
saveToFile(content: string, filePath: string): Promise<void>
```

Génère un PDF à partir de texte et l’enregistre via la classe Directory.

- content : texte à transformer en PDF.

- filePath : chemin de sauvegarde du fichier PDF (ex: output/report.pdf).

```ts
generate(content: string): Promise<Buffer>
```

Alias rapide de generateFromText.

## 💡 Utilisation

```ts
import { pdf } from "@/class/pdf";

await pdf.saveToFile("Mon rapport", "output/rapport.pdf");
```

## 📦 Dépendances

- pdf-lib

- puppeteer

- class Directory
