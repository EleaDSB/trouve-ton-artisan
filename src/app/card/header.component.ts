import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  template: `
    <header class="header-main">
      <div class="container mx-auto px-4">
        <nav class="flex items-center justify-between py-4">
          
          <!-- Logo -->
          <div class="flex items-center">
            <button 
              (click)="navigateToHome()"
              class="flex items-center hover:opacity-80 transition-opacity duration-200">
              <img 
                src="assets/images/logo.png" 
                alt="Logo Trouve Ton Artisan" 
                class="h-20 w-24 object-cover rounded-lg border-2 border-primary drop-shadow-md"
                (error)="onLogoError($event)">
            </button>
          </div>

          <!-- Navigation principale (Desktop uniquement - 1024px+) -->
          <div class="desktop-nav items-center space-x-8">
            <a 
              routerLink="/batiments"
              routerLinkActive="active"
              class="nav-link text-white hover:text-primary-light font-medium transition-colors duration-200">
              Bâtiments
            </a>
            <a 
              routerLink="/services"
              routerLinkActive="active"
              class="nav-link text-white hover:text-primary-light font-medium transition-colors duration-200">
              Services
            </a>
            <a 
              routerLink="/fabrication"
              routerLinkActive="active"
              class="nav-link text-white hover:text-primary-light font-medium transition-colors duration-200">
              Fabrication
            </a>
            <a 
              routerLink="/alimentation"
              routerLinkActive="active"
              class="nav-link text-white hover:text-primary-light font-medium transition-colors duration-200">
              Alimentation
            </a>
          </div>

          <!-- Barre de recherche (Desktop uniquement - 1024px+) -->
          <div class="desktop-search items-center">
            <div class="relative">
              <input 
                type="text"
                [(ngModel)]="searchTerm"
                (input)="onSearch()"
                (focus)="showResults = true"
                (blur)="hideResultsDelayed()"
                placeholder="Rechercher un artisan..."
                class="w-64 px-4 py-2 pl-10 bg-white border border-primary-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
              <svg 
                class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-dark"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              
              <!-- Résultats de recherche -->
              <div 
                *ngIf="showResults && searchResults.length > 0"
                class="absolute top-full left-0 right-0 mt-1 bg-white border border-primary-dark rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
                <div 
                  *ngFor="let artisan of searchResults"
                  class="px-4 py-3 hover:bg-primary-light cursor-pointer border-b border-gray-100 last:border-b-0"
                  (click)="selectArtisan(artisan)">
                  <div class="font-medium text-text-dark">{{ artisan.nom }}</div>
                  <div class="text-sm text-primary">{{ artisan.specialite }}</div>
                  <div class="text-xs text-text-light">{{ artisan.ville }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bouton menu mobile (< 1024px) -->
          <button 
            (click)="toggleMobileMenu()"
            class="mobile-menu-btn flex items-center justify-center w-10 h-10 text-white hover:text-primary-light transition-colors duration-200">
            <svg 
              class="w-6 h-6" 
              [class.hidden]="isMobileMenuOpen"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <svg 
              class="w-6 h-6" 
              [class.hidden]="!isMobileMenuOpen"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </nav>

        <!-- Menu mobile (< 1024px) -->
        <div 
          class="lg:hidden mobile-menu transition-all duration-300 ease-in-out"
          [class.open]="isMobileMenuOpen">
          
          <!-- Barre de recherche mobile -->
          <div class="px-4 pt-4 pb-2">
            <div class="relative">
              <input 
                type="text"
                [(ngModel)]="searchTerm"
                (input)="onSearch()"
                (focus)="showResults = true"
                (blur)="hideResultsDelayed()"
                placeholder="Rechercher un artisan..."
                class="w-full px-4 py-3 pl-10 bg-white border border-primary-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-base">
              <svg 
                class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-dark"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              
              <!-- Résultats de recherche mobile -->
              <div 
                *ngIf="showResults && searchResults.length > 0"
                class="absolute top-full left-0 right-0 mt-1 bg-white border border-primary-dark rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
                <div 
                  *ngFor="let artisan of searchResults"
                  class="px-4 py-3 hover:bg-primary-light cursor-pointer border-b border-gray-100 last:border-b-0"
                  (click)="selectArtisan(artisan)">
                  <div class="font-medium text-text-dark">{{ artisan.nom }}</div>
                  <div class="text-sm text-primary">{{ artisan.specialite }}</div>
                  <div class="text-xs text-text-light">{{ artisan.ville }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation mobile -->
          <nav class="flex flex-col px-4 pb-4 border-t border-white/20 mt-2 pt-4">
            <a 
              routerLink="/batiments"
              routerLinkActive="active"
              (click)="closeMobileMenu()"
              class="mobile-nav-link text-white hover:text-primary-light font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-lg">
              Bâtiments
            </a>
            <a 
              routerLink="/services"
              routerLinkActive="active"
              (click)="closeMobileMenu()"
              class="mobile-nav-link text-white hover:text-primary-light font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-lg">
              Services
            </a>
            <a 
              routerLink="/fabrication"
              routerLinkActive="active"
              (click)="closeMobileMenu()"
              class="mobile-nav-link text-white hover:text-primary-light font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-lg">
              Fabrication
            </a>
            <a 
              routerLink="/alimentation"
              routerLinkActive="active"
              (click)="closeMobileMenu()"
              class="mobile-nav-link text-white hover:text-primary-light font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-lg">
              Alimentation
            </a>
          </nav>
        </div>
      </div>
    </header>
  `,
  styles: [`
    /* Variables CSS pour la charte graphique */
    :host {
      --primary-light: #f1f8fc;
      --primary: #0074c7;
      --primary-dark: #00497c;
      --text-dark: #384050;
      --accent-red: #cd2c2e;
      --accent-green: #82b864;
    }

    /* Styles pour le header principal */
    .header-main {
      width: 100%;
      background-color: var(--primary-dark);
      border-bottom: 1px solid var(--primary);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      position: relative;
      z-index: 50;
    }

    /* Menu mobile - masqué par défaut */
    .mobile-menu {
      max-height: 0;
      overflow: hidden;
      background-color: var(--primary-dark);
    }

    .mobile-menu.open {
      max-height: 100vh;
    }

    /* Media queries pour la responsivité */
    /* Navigation et recherche desktop - cachées par défaut, visibles sur desktop */
    .desktop-nav,
    .desktop-search {
      display: none;
    }

    @media (min-width: 1024px) {
      .mobile-menu {
        display: none !important;
      }
      .mobile-menu-btn {
        display: none !important;
      }
      .desktop-nav,
      .desktop-search {
        display: flex !important;
      }
    }

    /* Styles spécifiques au container */
    .container {
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
    }

    /* Classes utilitaires pour les couleurs */
    .bg-primary-light { background-color: var(--primary-light); }
    .bg-primary { background-color: var(--primary); }
    .bg-primary-dark { background-color: var(--primary-dark); }
    .text-primary { color: var(--primary); }
    .text-primary-dark { color: var(--primary-dark); }
    .text-text-dark { color: var(--text-dark); }
    .text-text-light { color: #6b7280; }
    .border-primary { border-color: var(--primary); }
    .border-primary-dark { border-color: var(--primary-dark); }
    .hover\\:bg-primary-light:hover { background-color: var(--primary-light); }
    .hover\\:text-primary:hover { color: var(--primary); }
    .focus\\:ring-primary:focus { 
      --tw-ring-color: var(--primary);
      box-shadow: 0 0 0 2px var(--primary);
    }

    /* Style pour les liens de navigation */
    .nav-link {
      position: relative;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      transition: all 0.2s ease;
      color: white;
    }

    .nav-link:hover {
      transform: translateY(-1px);
      background-color: rgba(255, 255, 255, 0.1);
      color: var(--primary-light);
    }

    .nav-link.active {
      color: var(--primary-light);
      font-weight: 600;
      background-color: rgba(255, 255, 255, 0.15);
    }

    .nav-link.active::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 1rem;
      right: 1rem;
      height: 2px;
      background-color: var(--primary-light);
      border-radius: 1px;
    }

    /* Styles pour le menu mobile */
    .mobile-nav-link {
      text-decoration: none;
      transition: all 0.2s ease;
      border-radius: 0.5rem;
      display: block;
    }

    .mobile-nav-link:hover {
      background-color: rgba(255, 255, 255, 0.1);
      transform: translateX(4px);
    }

    .mobile-nav-link.active {
      color: var(--primary-light);
      font-weight: 600;
      background-color: rgba(255, 255, 255, 0.15);
      border-left: 4px solid var(--primary-light);
    }

    /* Animation pour le menu mobile */
    .max-h-0 {
      max-height: 0;
    }

    .max-h-screen {
      max-height: 100vh;
    }

    /* Style pour la barre de recherche */
    .search-input {
      transition: all 0.2s ease;
    }

    .search-input:focus {
      box-shadow: 0 0 0 2px var(--primary);
      border-color: var(--primary);
    }

    /* Animation pour les résultats de recherche */
    .search-results {
      animation: fadeInDown 0.2s ease-out;
    }

    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Transitions générales */
    * {
      transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 200ms;
    }

    /* Animation pour les boutons */
    button:hover:not(:disabled) {
      transform: translateY(-1px);
    }

    button:active:not(:disabled) {
      transform: translateY(0);
    }

    /* Style pour l'ombre du header */
    header {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }


    /* Amélioration de l'accessibilité */
    button:focus,
    a:focus,
    input:focus {
      outline: 2px solid var(--primary);
      outline-offset: 2px;
    }

    /* Responsive adjustments */
    @media (max-width: 1024px) {
      .nav-link {
        padding: 0.375rem 0.75rem;
        font-size: 0.875rem;
      }
    }

    @media (max-width: 768px) {
      .search-input {
        font-size: 16px; /* Évite le zoom sur iOS */
      }
    }
  `]
})
export class HeaderComponent {
  isMobileMenuOpen = false;
  searchTerm = '';
  showResults = false;
  searchResults: any[] = [];
  private hideResultsTimeout: any;

  // Données d'exemple d'artisans pour la recherche
  private artisans = [
    { id: 1, nom: 'Martin Dupont', specialite: 'Maçonnerie', ville: 'Paris', categorie: 'batiments' },
    { id: 2, nom: 'Sophie Bernard', specialite: 'Plomberie', ville: 'Lyon', categorie: 'services' },
    { id: 3, nom: 'Jean Moreau', specialite: 'Menuiserie', ville: 'Marseille', categorie: 'fabrication' },
    { id: 4, nom: 'Marie Dubois', specialite: 'Boulangerie', ville: 'Toulouse', categorie: 'alimentation' },
    { id: 5, nom: 'Pierre Laurent', specialite: 'Électricité', ville: 'Nice', categorie: 'services' },
    { id: 6, nom: 'Claire Petit', specialite: 'Charpenterie', ville: 'Nantes', categorie: 'batiments' },
    { id: 7, nom: 'Thomas Roux', specialite: 'Pâtisserie', ville: 'Strasbourg', categorie: 'alimentation' },
    { id: 8, nom: 'Isabelle Martin', specialite: 'Ébénisterie', ville: 'Bordeaux', categorie: 'fabrication' }
  ];

  constructor(private router: Router) {}

  /**
   * Navigation vers la page d'accueil
   */
  navigateToHome(): void {
    this.router.navigate(['/home']);
    this.closeMobileMenu();
  }

  /**
   * Basculer l'affichage du menu mobile
   */
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  /**
   * Fermer le menu mobile
   */
  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  /**
   * Recherche d'artisans
   */
  onSearch(): void {
    const term = this.searchTerm.toLowerCase().trim();
    
    if (term.length === 0) {
      this.searchResults = [];
      return;
    }

    this.searchResults = this.artisans.filter(artisan => 
      artisan.nom.toLowerCase().includes(term) ||
      artisan.specialite.toLowerCase().includes(term) ||
      artisan.ville.toLowerCase().includes(term)
    ).slice(0, 8); // Limiter à 8 résultats

    this.showResults = true;
  }

  /**
   * Sélectionner un artisan dans les résultats
   */
  selectArtisan(artisan: any): void {
    this.router.navigate(['/artisan', artisan.id]);
    this.searchTerm = '';
    this.searchResults = [];
    this.showResults = false;
  }

  /**
   * Masquer les résultats avec délai
   */
  hideResultsDelayed(): void {
    this.hideResultsTimeout = setTimeout(() => {
      this.showResults = false;
    }, 200);
  }

  /**
   * Gestion des erreurs du logo
   */
  onLogoError(event: any): void {
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjMDA3NGM3IiByeD0iOCIvPgo8dGV4dCB4PSIyNCIgeT0iMjgiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iI2YxZjhmYyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VEE8L3RleHQ+Cjwvc3ZnPgo=';
  }
}