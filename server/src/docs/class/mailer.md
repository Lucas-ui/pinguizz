# ✉️ Mailer – Classe d’envoi d’emails avec templates et gestion avancée

Classe utilitaire pour envoyer des emails en utilisant SMTP via nodemailer (ou un système équivalent), avec support des templates HTML/textes dynamiques.

## 📌 Configuration

```ts
const mailer = new Mailer({
  host: "smtp.exemple.com",
  port: 587,
  secure: false,
  auth: {
    user: "utilisateur",
    pass: "motdepasse",
  },
  templatesPath: "src/templates/mail",
});
```

- host, port, secure, auth : configuration SMTP

- templatesPath : chemin racine des templates mail (HTML + texte)

## 🛠️ Méthodes disponibles

```ts
sendMail(options: SendMailOptions): Promise<void>
```

Envoie un email selon les options fournies.

Options possibles :

- to: string | string[] — destinataires

- subject: string — sujet du mail

- text?: string — contenu texte brut

- html?: string — contenu HTML

- templateName?: string — nom du template à utiliser

- variables?: Record<string, any> — variables à injecter dans le template

- attachments?: Attachment[] — fichiers joints

```ts
renderTemplate(templateName: string, variables: Record<string, any>): Promise<string>
```

Charge et rend un template HTML/text avec interpolation des variables.

Exemple simple d’envoi :

```ts
await mailer.sendMail({
  to: "user@example.com",
  subject: "Bienvenue !",
  templateName: "welcome.html",
  variables: { username: "Alice" },
});
```

## 🎯 Fonctionnalités clés

- Chargement dynamique de templates (HTML ou texte) depuis un dossier configurable

- Interpolation simple de variables dans le template via {{ variableName }}

- Support des pièces jointes

- Gestion des erreurs avec logs clairs

- Configuration flexible pour divers serveurs SMTP

## 📦 Dépendances

- nodemailer

- fs/promises pour la lecture des templates

- class/directory
