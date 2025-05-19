# 📘 QRCode – Générateur de QR codes & encodage de données

Classe utilitaire basée sur [`qrcode`](https://www.npmjs.com/package/qrcode) permettant de générer des QR codes sous différents formats et d'encoder des données courantes (email, téléphone, Wi-Fi…).

## 🔧 Méthodes disponibles

### toDataURL

```ts
toDataURL(data: string): Promise<string>
```

Génère un QR code au format Data URL base64 (image PNG).
Utilisable directement dans une balise :

```html
<img src="data:image/png;base64,...">
```

### toBuffer

```ts
toBuffer(data: string): Promise<Buffer>
```

Génère un QR code sous forme de buffer brut (PNG).
Utile pour l’enregistrement sur disque, les uploads ou les envois via API.

### toSVG

```ts
toSVG(data: string): Promise<string>
```

Retourne le QR code au format SVG (chaîne de texte).

### toTerminal

```ts
toTerminal(data: string): Promise<string>
```

Affiche un QR code en mode terminal (ASCII).
Parfait pour des tests CLI, logs ou intégration sans interface graphique.

### createLink

```ts
createLink(url: string): string
```

Retourne directement l’URL fournie.
Utilité : homogénéiser l’appel avec les autres méthodes.

### createEmail

```ts
createEmail(to: string, subject?: string, body?: string): string
```

Génère un lien mailto: encodé.

```txt
Exemple :   mailto:test@example.com?subject=Hello&body=Test%20message
```

### createSMS

```ts
createSMS(number: string, message?: string): string
```

Génère un lien sms: utilisable dans un QR code.

### createPhoneCall

```ts
createPhoneCall(number: string): string
```

Retourne un lien tel: pour appels téléphoniques.

### createWifi

```ts
createWifi(
  ssid: string,
  password: string,
  type?: "WPA" | "WEP"
): string
```

Génère une chaîne au format spécifique Wi-Fi QR code.

```txt
Exemple :   WIFI:T:WPA;S:MyNetwork;P:MyPassword;;
```

## Exemples d’utilisation

```ts
import { qrCode } from "@/class/qrcode";

const url = qrCode.createLink("https://example.com");
const imageData = await qrCode.toDataURL(url);

const svg = await qrCode.toSVG("Hello world");
const buffer = await qrCode.toBuffer("Secure data");

const wifi = qrCode.createWifi("FreeWifi", "pass123");
const wifiQR = await qrCode.toDataURL(wifi);
```

## 📦 Dépendances

- qrcode

- Node.js Buffer (natif)
