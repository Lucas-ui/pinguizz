# Documentation - Modèles Sequelize (ORM)

## 🔍 Objectif des modèles

Les modèles Sequelize permettent de faire le lien entre :

-   Les **tables SQL** (schéma de la base)
-   Les **objets JS/TS** dans ton application

C'est ce qu'on appelle un **mapping objet-relationnel (ORM)**.

---

## 📦 Exemple : `User` Model

### 🎯 Objectif

Le modèle `User` représente la table `Users` avec :

-   Des **attributs** : `id`, `username`, `password`, `createdAt`, `updatedAt`
-   Des **contraintes** : validation, unicité, non-null
-   Un **mapping automatique** vers la base via Sequelize

---

## 🧩 Structure d’un modèle Sequelize

### 1. **Attributs du modèle**

Définis dans `User.init(...)` :

```ts
id: {
  type: DataTypes.UUID,
  allowNull: false,
  defaultValue: identifier.uuidV7,
  primaryKey: true,
},
username: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true,
  validate: {
    notNull: true,
    notEmpty: true,
    len: [3, 20],
  },
},
password: {
  type: DataTypes.STRING,
  allowNull: false,
  validate: {
    len: [10, 64],
  },
}
```

2. Contraintes automatiques

Grâce à validate et allowNull, Sequelize déclenche des erreurs avant même d’exécuter la requête SQL.
Exemples :

-   notEmpty: empêche les champs vides

-   len: limite la taille

-   unique: évite les doublons (avec message personnalisé)

3. Gestion des timestamps

Automatique grâce à createdAt / updatedAt. Sequelize les gère si définis dans le modèle (option timestamps: true par défaut).
🔁 Associations et cardinalités

Les modèles Sequelize permettent aussi de gérer les relations :

-   One to Many → hasMany / belongsTo

-   Many to Many → belongsToMany

-   One to One → hasOne / belongsTo

Exemple :

-   User.hasMany(Post);

-   Post.belongsTo(User);

Cela crée :

-   Une clé étrangère userId dans la table Post

-   Des méthodes associées comme user.getPosts()

## 🔐 Bonnes pratiques

-   Déclarer les validations dans le modèle plutôt que dans les contrôleurs

-   Utiliser interface et Optional<> en TypeScript pour les attributs

-   Centraliser init() et setupAssociations() pour chaque modèle

-   Grouper les appels dans une fonction initializeAllModels(sequelize)

## 🧪 Initialisation centralisée

Dans ton projet, chaque modèle contient :

```ts
static async initialize(sequelize: Sequelize) { ... }
static setupAssociations() { ... }
```

Et tous les modèles sont initialisés dans :

```ts
export async function initializeAllModels(sequelize: Sequelize) {
await User.initialize(sequelize);
...
User.setupAssociations();
}
```

## 🧠 Rappel : ORM

Un ORM (Object-Relational Mapping) permet :

-   D’écrire du code en JS/TS pour interagir avec une base SQL

-   De ne plus avoir besoin d’écrire de SQL brut (sauf cas spécifiques)

-   De bénéficier d’une séparation de logique (modèle ↔ base)
