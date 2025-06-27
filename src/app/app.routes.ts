import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./card/home.component').then(m => m.HomeComponent) },
  // { path: 'batiments', loadComponent: () => import('./pages/batiments/batiments.component').then(m => m.BatimentsComponent) },
  // { path: 'services', loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent) },
  // { path: 'fabrication', loadComponent: () => import('./pages/fabrication/fabrication.component').then(m => m.FabricationComponent) },
  // { path: 'alimentation', loadComponent: () => import('./pages/alimentation/alimentation.component').then(m => m.AlimentationComponent) },
  // { path: 'artisan/:id', loadComponent: () => import('./pages/artisan/artisan.component').then(m => m.ArtisanComponent) },
  { path: '**', redirectTo: '/home' }
];
