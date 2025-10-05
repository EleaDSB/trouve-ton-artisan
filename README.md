# Trouve Ton Artisan

Application web développée avec Angular 17 pour la région Auvergne-Rhône-Alpes, permettant aux particuliers de trouver et contacter des artisans qualifiés.

## 🎨 Typographie

Le projet utilise la police **Graphik** comme spécifié dans les consignes de la région. En attendant l'installation des fichiers de police, **Inter** est utilisée comme fallback principal.

### Installation de la police Graphik

1. Téléchargez les fichiers de police Graphik depuis [Commercial Type](https://commercialtype.com/catalog/graphik)
2. Placez les fichiers dans `src/assets/fonts/` :
   - Graphik-Regular.woff2 et .woff
   - Graphik-Medium.woff2 et .woff
   - Graphik-Semibold.woff2 et .woff
   - Graphik-Bold.woff2 et .woff
3. Décommentez les déclarations `@font-face` dans `src/styles.scss`
4. Redémarrez le serveur

Voir `GRAPHIK_IMPLEMENTATION.md` pour plus de détails.

## 🚀 Technologies utilisées

- **Angular 17** (Standalone Components)
- **TypeScript**
- **SCSS**
- **Tailwind CSS** (classes utilitaires)
- **RxJS**
- **Angular Universal** (SSR)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
