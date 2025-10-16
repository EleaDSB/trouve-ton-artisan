# 🔨 Trouve Ton Artisan

Application web développée avec **Angular 17** pour la région **Auvergne-Rhône-Alpes**, permettant aux particuliers de trouver et contacter des artisans qualifiés dans différents domaines.

![Angular](https://img.shields.io/badge/Angular-17-DD0031?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)

---

## 📋 Table des matières

- [À propos](#-à-propos)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Lancement de l'application](#-lancement-de-lapplication)
- [Technologies utilisées](#-technologies-utilisées)
- [Fonctionnalités](#-fonctionnalités)
- [Structure du projet](#-structure-du-projet)
- [Scripts disponibles](#-scripts-disponibles)
- [Sécurité](#-sécurité)
- [Conformité W3C & Accessibilité](#-conformité-w3c--accessibilité)
- [Auteur](#-auteur)

---

## 🎯 À propos

**Trouve Ton Artisan** est une plateforme en ligne qui facilite la mise en relation entre particuliers et artisans qualifiés. Les utilisateurs peuvent :

- **Rechercher** des artisans par catégorie, spécialité ou localisation
- **Consulter** les profils détaillés avec notes et avis
- **Contacter** directement les artisans via un formulaire sécurisé
- **Obtenir** une réponse garantie sous 48h

### 🏗️ Catégories disponibles

- **Bâtiments** : Maçonnerie, charpente, toiture, etc.
- **Services** : Plomberie, électricité, jardinage, etc.
- **Fabrication** : Menuiserie, couture, etc.
- **Alimentation** : Boulangerie, pâtisserie, traiteur, etc.

---

## 📌 Prérequis

Avant de commencer, assurez-vous d'avoir les outils suivants installés sur votre machine :

### Obligatoires

| Outil | Version minimale | Vérification |
|-------|------------------|--------------|
| **Node.js** | 18.x ou supérieur | `node --version` |
| **npm** | 9.x ou supérieur | `npm --version` |
| **Git** | 2.x ou supérieur | `git --version` |

### Recommandés

- **Angular CLI** : `npm install -g @angular/cli@17`
- **VS Code** avec les extensions :
  - Angular Language Service
  - ESLint
  - Prettier

### Vérifier Node.js et npm

```bash
node --version  # Doit afficher v18.x ou supérieur
npm --version   # Doit afficher 9.x ou supérieur
```

> **Note** : Si Node.js n'est pas installé, téléchargez-le depuis [nodejs.org](https://nodejs.org/)

---

## 🚀 Installation

Suivez ces étapes pour installer et configurer le projet en local :

### 1️⃣ Cloner le dépôt

```bash
git clone https://github.com/votre-username/trouve-ton-artisan.git
cd trouve-ton-artisan
```

### 2️⃣ Installer les dépendances

```bash
npm install
```

Cette commande installe toutes les dépendances nécessaires listées dans `package.json` (~605 packages).

⏱️ **Temps estimé** : 2-5 minutes selon votre connexion internet.

### 3️⃣ Configuration (optionnel)

#### Variables d'environnement

Créez un fichier `.env` à la racine (optionnel pour la production) :

```env
PORT=4000
ALLOWED_ORIGINS=http://localhost:4200,http://localhost:4000
```

#### Installation de la police Graphik (optionnel)

1. Téléchargez les fichiers de police **Graphik** depuis [Commercial Type](https://commercialtype.com/catalog/graphik)
2. Placez les fichiers dans `src/assets/fonts/` :
   - `Graphik-Regular.woff2` et `.woff`
   - `Graphik-Medium.woff2` et `.woff`
   - `Graphik-Semibold.woff2` et `.woff`
   - `Graphik-Bold.woff2` et `.woff`
3. Décommentez les déclarations `@font-face` dans `src/styles.scss`
4. Redémarrez le serveur

> **Note** : Si la police Graphik n'est pas installée, la police **Inter** (Google Fonts) est utilisée comme fallback.

Voir `GRAPHIK_IMPLEMENTATION.md` pour plus de détails.

---

## 🖥️ Lancement de l'application

### Mode développement

Lancez le serveur de développement Angular :

```bash
npm start
# ou
ng serve
```

L'application sera accessible sur **http://localhost:4200/**

✅ **Fonctionnalités en mode dev** :
- Rechargement automatique à chaque modification
- Source maps pour le débogage
- Messages d'erreur détaillés dans la console

### Mode production (avec SSR)

#### 1. Compiler l'application

```bash
npm run build
```

Les fichiers compilés seront dans le dossier `dist/`.

#### 2. Lancer le serveur SSR

```bash
npm run serve:ssr:trouve-ton-artisan
```

L'application sera accessible sur **http://localhost:4000/**

✅ **Avantages du SSR** :
- Meilleur référencement SEO
- Temps de chargement initial plus rapide
- Prérendu des pages pour les moteurs de recherche

### Tester les emails (développement)

Le projet utilise **Maildev** pour tester les emails en local sans envoyer de vrais messages.

```bash
npm run maildev
```

Interface web Maildev : **http://localhost:1080/**

Tous les emails envoyés depuis le formulaire de contact seront capturés et affichés dans cette interface.

> **Documentation** : Voir `MAILDEV_SETUP.md` pour la configuration complète.

---

## 🛠️ Technologies utilisées

### Frontend

| Technologie | Version | Rôle |
|-------------|---------|------|
| **Angular** | 17.3.0 | Framework principal |
| **TypeScript** | 5.4.2 | Langage de programmation |
| **RxJS** | 7.8.0 | Programmation réactive |
| **Tailwind CSS** | 3.4.17 | Framework CSS utilitaire |
| **SCSS** | - | Préprocesseur CSS |

### Backend

| Technologie | Version | Rôle |
|-------------|---------|------|
| **Express.js** | 4.18.2 | Serveur Node.js |
| **Nodemailer** | 7.0.7 | Envoi d'emails |
| **Angular Universal** | 17.3.17 | Server-Side Rendering |

### Sécurité

| Package | Rôle |
|---------|------|
| **Helmet** | Headers HTTP sécurisés |
| **CORS** | Protection cross-origin |
| **express-rate-limit** | Limitation de taux |
| **express-validator** | Validation des entrées |

### Développement

| Outil | Rôle |
|-------|------|
| **Angular CLI** | Interface de ligne de commande |
| **Maildev** | Serveur SMTP de test |
| **Autoprefixer** | Préfixes CSS automatiques |

---

## ✨ Fonctionnalités

### 🔍 Recherche d'artisans

- **Recherche en temps réel** par nom, spécialité ou ville
- **Filtrage par catégorie** (bâtiments, services, fabrication, alimentation)
- **Système de notation** avec étoiles (1-5)
- **12 artisans** disponibles dans la base de données

### 👤 Profils détaillés

- Informations complètes (nom, entreprise, spécialité, localisation)
- Note moyenne et nombre d'avis
- Coordonnées (téléphone, email, site web)
- Section "À propos" personnalisée

### 📧 Formulaire de contact sécurisé

- **Validation côté client et serveur**
- **Rate limiting** : 5 messages maximum par heure
- **Sanitization** des entrées (protection XSS)
- **Confirmation visuelle** après envoi
- Emails formatés en HTML

### 🎨 Design responsive

- **Mobile-first** : optimisé pour smartphones
- **Breakpoints** : 640px / 768px / 1024px / 1280px
- **Menu burger** pour mobile
- **Animations fluides** et transitions
- **Glassmorphism** sur le header

### 🔒 Sécurité avancée

- **Headers sécurisés** (Helmet.js)
- **CSP** (Content Security Policy)
- **HSTS** (HTTP Strict Transport Security)
- **Rate limiting** global et spécifique
- **Validation et sanitization** de toutes les entrées

### ♿ Accessibilité (WCAG 2.1)

- **Conformité W3C** HTML5
- **Attributs ARIA** sur tous les éléments interactifs
- **Navigation au clavier** complète
- **Contrastes de couleur** optimisés
- **Textes alternatifs** sur toutes les images

---

## 📁 Structure du projet

```
trouve-ton-artisan/
├── src/
│   ├── app/
│   │   ├── card/                     # Composants principaux
│   │   │   ├── header.component.ts         # Navigation + recherche
│   │   │   ├── footer.component.ts         # Pied de page
│   │   │   ├── home.component.ts           # Page d'accueil
│   │   │   ├── artisans-list.component.ts  # Liste avec filtres
│   │   │   ├── artisan-details.component.ts # Profil + formulaire
│   │   │   └── page-404.component.ts       # Page 404
│   │   ├── models/
│   │   │   └── artisan.model.ts            # Interface TypeScript
│   │   ├── services/
│   │   │   ├── artisans.service.ts         # Gestion artisans (cache)
│   │   │   └── email.service.ts            # Envoi emails
│   │   ├── app.component.ts                # Composant racine
│   │   ├── app.routes.ts                   # Configuration routing
│   │   └── app.config.ts                   # Configuration app
│   ├── assets/
│   │   ├── data/
│   │   │   └── artisans.json               # Base de données (12 artisans)
│   │   ├── fonts/                          # Police Graphik (optionnel)
│   │   └── images/
│   │       └── logo.png                    # Logo application
│   ├── index.html                          # Point d'entrée HTML
│   ├── main.ts                             # Bootstrap client
│   ├── main.server.ts                      # Bootstrap serveur
│   └── styles.scss                         # Styles globaux
├── server.ts                               # Serveur Express + SSR
├── angular.json                            # Config Angular CLI
├── tailwind.config.js                      # Config Tailwind CSS
├── tsconfig.json                           # Config TypeScript
├── package.json                            # Dépendances npm
├── README.md                               # Ce fichier
├── SECURITY.md                             # Documentation sécurité
├── GRAPHIK_IMPLEMENTATION.md               # Guide police Graphik
└── MAILDEV_SETUP.md                        # Configuration Maildev
```

---

## 📜 Scripts disponibles

Tous les scripts sont définis dans `package.json` :

| Commande | Description |
|----------|-------------|
| `npm start` | Lance le serveur de développement (port 4200) |
| `npm run build` | Compile l'application pour la production |
| `npm run watch` | Compile en mode watch (rechargement automatique) |
| `npm run serve:ssr:trouve-ton-artisan` | Lance le serveur SSR (port 4000) |
| `npm run maildev` | Lance Maildev pour tester les emails |
| `ng generate component nom` | Génère un nouveau composant |
| `ng lint` | Vérifie le code avec ESLint |

### Exemples d'utilisation

```bash
# Développement classique
npm start

# Build de production
npm run build

# Serveur SSR en production
npm run build
npm run serve:ssr:trouve-ton-artisan

# Tester les emails
npm run maildev
# Puis dans un autre terminal :
npm start
```

---

## 🔒 Sécurité

Le projet implémente **12 mesures de sécurité** pour protéger l'application et les utilisateurs.

### Principales mesures

✅ **Helmet.js** - Headers HTTP sécurisés (CSP, HSTS, XSS)
✅ **CORS** - Contrôle des origines autorisées
✅ **Rate Limiting** - 100 req/15min (global) + 5 emails/heure
✅ **Validation des entrées** - Côté client ET serveur
✅ **Sanitization** - Protection contre XSS et injections
✅ **TypeScript strict** - Détection d'erreurs à la compilation
✅ **HTTPS recommandé** - En production avec certificat SSL
✅ **Gestion des erreurs** - Messages génériques pour l'utilisateur
✅ **Maildev** - Aucun email réel en développement

### Documentation complète

Consultez le fichier **`SECURITY.md`** pour la documentation exhaustive des mesures de sécurité.

---

## ✅ Conformité W3C & Accessibilité

### Normes W3C HTML5

Le code HTML respecte les standards du **W3C** :

- ✅ `<!DOCTYPE html>` valide
- ✅ Attribut `lang="fr"` sur `<html>`
- ✅ Structure sémantique (`<header>`, `<main>`, `<footer>`, `<nav>`)
- ✅ Balises `<button>` avec attribut `type`
- ✅ Champs `<input type="search">` pour la recherche
- ✅ Attributs `role="search"` sur les formulaires de recherche
- ✅ Liens externes avec `rel="noopener noreferrer"`

### Accessibilité WCAG 2.1

Le projet respecte les critères **WCAG 2.1 niveau AA** :

- ✅ **Navigation au clavier** complète (Tab, Enter, Esc)
- ✅ **Attributs ARIA** (`aria-label`, `aria-hidden`, `aria-expanded`)
- ✅ **Contrastes de couleur** suffisants (4.5:1 minimum)
- ✅ **Textes alternatifs** sur toutes les images
- ✅ **Focus visible** sur tous les éléments interactifs
- ✅ **Tailles de clic** : minimum 44x44px sur mobile
- ✅ **Support des technologies d'assistance** (lecteurs d'écran)

### Tests de validation

Pour valider le HTML généré :

1. Lancez l'application : `npm start`
2. Ouvrez http://localhost:4200/
3. Utilisez le [validateur W3C](https://validator.w3.org/)
4. Testez l'accessibilité avec [WAVE](https://wave.webaim.org/)

---

## 🚧 Développement

### Conventions de code

- **Indentation** : 2 espaces
- **Quotes** : Simple quotes `'`
- **Semicolons** : Requis
- **Naming** :
  - Composants : `PascalCase` (ex: `HeaderComponent`)
  - Fichiers : `kebab-case` (ex: `header.component.ts`)
  - Variables : `camelCase` (ex: `searchTerm`)

### Générer un composant

```bash
ng generate component card/nom-du-composant
# ou raccourci :
ng g c card/nom-du-composant
```

Cela créera automatiquement :
- `nom-du-composant.component.ts`
- Template et styles inline (configuré dans `angular.json`)
- Import standalone automatique

### Architecture

Le projet utilise l'architecture **Standalone Components** d'Angular 17 :

- ✅ Pas de modules NgModule
- ✅ Imports explicites dans chaque composant
- ✅ Lazy loading natif des routes
- ✅ Tree-shaking optimal

---

## 📝 Données

### Base de données

Les artisans sont stockés dans `src/assets/data/artisans.json`.

**Format** :

```json
{
  "id": 1,
  "nom": "Martin Dupont",
  "entreprise": "Maçonnerie Dupont",
  "specialite": "Maçonnerie",
  "note": 4.8,
  "ville": "Lyon",
  "categorie": "batiments",
  "telephone": "01 23 45 67 89",
  "email": "martin.dupont@email.com",
  "siteWeb": "https://www.maconnerie-dupont.fr",
  "description": "Spécialiste en maçonnerie traditionnelle",
  "aPropos": "Avec plus de 15 ans d'expérience..."
}
```

**12 artisans** sont actuellement disponibles dans la base.

### Ajouter un artisan

1. Ouvrez `src/assets/data/artisans.json`
2. Ajoutez un nouvel objet avec un `id` unique
3. Remplissez tous les champs requis
4. Sauvegardez et rechargez l'application

---

## 🐛 Dépannage

### Le serveur ne démarre pas sur le port 4200

**Erreur** : `Port 4200 is already in use`

**Solution** :
```bash
# Arrêter le processus existant
pkill -f "ng serve"
# Ou utiliser un autre port
ng serve --port 4300
```

### Erreurs de compilation TypeScript

**Erreur** : `error TS2307: Cannot find module...`

**Solution** :
```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Les emails ne s'envoient pas

**Vérification** :

1. Maildev est-il lancé ? `npm run maildev`
2. Le serveur Express est-il démarré ?
3. Vérifiez les logs de la console navigateur (F12)
4. Vérifiez le rate limiting (max 5 emails/heure)

### Problèmes de style (Tailwind)

**Solution** :
```bash
# Régénérer les styles Tailwind
npx tailwindcss -i ./src/styles.scss -o ./dist/output.css
```

---

## 📦 Déploiement

### Prérequis production

- ✅ Serveur Node.js 18+
- ✅ Certificat SSL/TLS (HTTPS obligatoire)
- ✅ Service SMTP (remplacer Maildev)
- ✅ Variables d'environnement configurées

### Étapes de déploiement

```bash
# 1. Compiler en mode production
npm run build

# 2. Configurer les variables d'environnement
export PORT=4000
export ALLOWED_ORIGINS=https://votre-domaine.com

# 3. Lancer le serveur SSR
npm run serve:ssr:trouve-ton-artisan
```

### Checklist sécurité production

- [ ] HTTPS activé avec certificat valide
- [ ] Variables d'environnement `ALLOWED_ORIGINS` configurées
- [ ] Service SMTP production (SendGrid, AWS SES, etc.)
- [ ] Rate limiting activé et testé
- [ ] Headers de sécurité vérifiés (Helmet)
- [ ] Audit npm (`npm audit fix`)
- [ ] Logs de sécurité configurés
- [ ] Backup de la base de données

---

## 👨‍💻 Auteur

**Nom** : [Votre Nom]
**Email** : [votre.email@example.com]
**GitHub** : [@votre-username](https://github.com/votre-username)

---

## 📄 Licence

Ce projet est développé dans le cadre d'une formation et est destiné à des fins éducatives.

---

## 🙏 Remerciements

- **Région Auvergne-Rhône-Alpes** pour les spécifications du projet
- **Angular Team** pour le framework
- **Tailwind CSS** pour le système de design
- **Commercial Type** pour la police Graphik

---

## 📞 Support

Pour toute question ou problème :

1. **Documentation** : Consultez d'abord ce README
2. **Issues GitHub** : Ouvrez une issue sur le dépôt
3. **Email** : Contactez l'auteur

---

**Version** : 0.0.0
**Dernière mise à jour** : Octobre 2025
**Framework** : Angular 17.3.0
**Node.js** : 18+
