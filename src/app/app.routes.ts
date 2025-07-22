import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./card/home.component').then(m => m.HomeComponent) },
  { path: 'artisans', loadComponent: () => import('./card/artisans-list.component').then(m => m.ArtisansListComponent) },
  { path: 'batiments', loadComponent: () => import('./card/artisans-list.component').then(m => m.ArtisansListComponent) },
  { path: 'services', loadComponent: () => import('./card/artisans-list.component').then(m => m.ArtisansListComponent) },
  { path: 'fabrication', loadComponent: () => import('./card/artisans-list.component').then(m => m.ArtisansListComponent) },
  { path: 'alimentation', loadComponent: () => import('./card/artisans-list.component').then(m => m.ArtisansListComponent) },
  { path: 'artisan/:id', loadComponent: () => import('./card/artisan-details.component').then(m => m.ArtisanDetailsComponent) },
  { path: '404', loadComponent: () => import('./card/page-404.component').then(m => m.Page404Component) },
  { path: '**', redirectTo: '/404' }
];
