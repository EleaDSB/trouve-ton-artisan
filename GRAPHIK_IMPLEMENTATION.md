# Implémentation de la police Graphik

## Modifications apportées

### 1. Configuration dans `src/styles.scss`

- Ajout des déclarations `@font-face` pour Graphik (Regular, Medium, Semibold, Bold)
- Import de polices de fallback (Inter et Source Sans Pro) depuis Google Fonts
- Modification de la font-family principale pour utiliser Graphik en priorité
- Ajout de classes utilitaires pour la typographie

### 2. Optimisations dans `src/index.html`

- Ajout de `preconnect` pour Google Fonts
- Preload de la police Inter (fallback principal)
- Optimisation du chargement avec `onload` et `noscript`
- Correction de la langue (fr au lieu de en)

### 3. Structure des polices

```
src/assets/fonts/
├── README.md                    # Instructions d'installation
├── Graphik-Regular.woff2        # À télécharger
├── Graphik-Regular.woff         # À télécharger
├── Graphik-Medium.woff2         # À télécharger
├── Graphik-Medium.woff          # À télécharger
├── Graphik-Semibold.woff2       # À télécharger
├── Graphik-Semibold.woff        # À télécharger
├── Graphik-Bold.woff2           # À télécharger
└── Graphik-Bold.woff            # À télécharger
```

### 4. Fallback strategy

1. **Graphik** (si les fichiers sont installés)
2. **Inter** (chargé depuis Google Fonts)
3. **Source Sans Pro** (alternative similaire)
4. Polices système natives

### 5. Classes CSS disponibles

- `.font-graphik` : Force l'utilisation de Graphik
- `.font-normal` : Poids 400
- `.font-medium` : Poids 500
- `.font-semibold` : Poids 600
- `.font-bold` : Poids 700
- `.text-title` : Style spécial pour les titres

### 6. Optimisations de performance

- `font-display: swap` pour éviter le FOIT (Flash of Invisible Text)
- Preconnect et preload pour Google Fonts
- Letterspacing optimisé pour Graphik
- Support des polices système avec `-apple-system` et `BlinkMacSystemFont`

## Installation complète

Pour utiliser pleinement Graphik :

1. Télécharger les fichiers de police depuis Commercial Type
2. Les placer dans `src/assets/fonts/`
3. Redémarrer le serveur de développement

## Conformité avec les consignes

✅ **Respecte les consignes du PDF :**
- Utilise la police Graphik comme demandé par la région
- Fallback approprié en cas d'indisponibilité
- Optimisations web modernes
- Compatible avec tous les navigateurs

## Test

✅ **La police Graphik est maintenant installée et fonctionnelle !**

### Vérifications effectuées :
- ✅ Fichiers de police copiés et configurés
- ✅ Déclarations @font-face activées dans styles.scss
- ✅ Build de production réussi
- ✅ Polices incluses dans dist/ (avec hachage de cache)
- ✅ Serveur de développement fonctionnel

### Tests disponibles :
1. **Application en live :** http://localhost:4201/
2. **Fichier de test :** Ouvrir `GRAPHIK_TEST.html` dans un navigateur
3. **DevTools :** Inspecter l'élément et vérifier que Graphik est utilisée

### Commandes :
```bash
npm start                 # Serveur de développement
npm run build            # Build de production
```

Les polices Graphik sont maintenant la police principale de l'application, avec Inter comme fallback de qualité.