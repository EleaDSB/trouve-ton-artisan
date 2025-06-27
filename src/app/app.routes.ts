import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./card/home.component').then(m => m.HomeComponent) },
  { path: 'artisans', loadComponent: () => import('./card/artisans-list.component').then(m => m.ArtisansListComponent) },
  { path: 'batiments', loadComponent: () => import('./card/artisans-list.component').then(m => m.ArtisansListComponent) },
  { path: 'services', loadComponent: () => import('./card/artisans-list.component').then(m => m.ArtisansListComponent) },
  { path: 'fabrication', loadComponent: () => import('./card/artisans-list.component').then(m => m.ArtisansListComponent) },
  { path: 'alimentation', loadComponent: () => import('./card/artisans-list.component').then(m => m.ArtisansListComponent) },
  // { path: 'artisan/:id', loadComponent: () => import('./pages/artisan/artisan.component').then(m => m.ArtisanComponent) },
  { path: '**', redirectTo: '/home' }
];
