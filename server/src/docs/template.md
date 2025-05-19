# 📁 Architecture des Templates – Organisation et structure

Ce dossier templates contient tous les fichiers de templates utilisés dans l’application, pour générer des contenus dynamiques, que ce soit pour les emails ou les réponses HTTP (pages HTML).

## 🗂️ Structure principale

```txt
src/
└── templates/
    ├── http/
    │   ├── layout.html
    │   ├── homepage.html
    │   └── error.html
    └── mail/
        ├── welcome.html
        ├── reset-password.html
        └── notification.txt
```

## 📋 Description des dossiers

1. http/

    Contient les templates HTML utilisés pour répondre aux requêtes HTTP.

    Typiquement :

    - layout.html : template de base partagé (header, footer, styles communs)

    - homepage.html : page d’accueil

    - error.html : page d’erreur personnalisée

    Ces fichiers sont du HTML classique avec des placeholders dynamiques du type {{ variable }}. Ils peuvent être utilisés pour rendre les réponses HTTP via un moteur de template maison ou adapté.

2. mail/

    Contient les templates pour les emails envoyés par l’application.

    Ces templates peuvent être en HTML ou en texte brut (.html ou .txt).

    Exemples :

    - welcome.html : email de bienvenue

    - reset-password.html : email de réinitialisation de mot de passe

    - notification.txt : version texte simple d’une notification

Les templates contiennent aussi des placeholders {{ variable }} qui seront remplacés par les valeurs dynamiques avant envoi.

## 🧱 Structure d’un template

Chaque template (HTML ou TXT) suit cette logique :

- Texte statique pour le contenu fixe

- Placeholders dynamiques entre doubles accolades

```txt
Exemple :
    <p>Bonjour {{ username }},</p>
    <p>Votre code de confirmation est : {{ code }}</p>
```

Pour les templates HTML, on peut intégrer un template de base via inclusion manuelle ou traitement dans le code (par exemple, injecter layout.html autour du contenu).

## 🔧 Utilisation avec la classe Directory

On utilise :

 ```ts
directory.getTemplatePath("mail/welcome.html")  
```

pour récupérer le chemin complet du template.

On charge le template avec :

 ```ts
directory.readFile(...)
 ```

On remplace les placeholders via directory.

 ```ts
renderTemplate(templatePath, variables)
 ```

## ⚙️ Extensibilité

Ajouter un nouveau template :

- Placer le fichier dans le dossier http/ ou mail/ selon usage

- Utiliser un nom clair et explicite

- Ajouter les placeholders nécessaires dans le fichier

On peut créer d’autres sous-dossiers selon les besoins (exemple : sms/, push/…)

## 💡 Bonnes pratiques

- Garder les templates légers et séparés du code métier

- Utiliser un système de noms cohérent (camelCase, tirets, etc.)

- Toujours documenter les placeholders attendus dans chaque template
