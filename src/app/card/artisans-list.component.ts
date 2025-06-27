import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Artisan } from '../models/artisan.model';
import { ArtisansService } from '../services/artisans.service';

@Component({
  selector: 'app-artisans-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ],
  template: `
    <div class="artisans-list-container">
      <div class="container mx-auto px-4 py-8">
        
        <!-- En-tête avec titre et filtres -->
        <div class="header-section mb-8">
          <h1 class="text-4xl font-bold text-text-dark mb-4">
            {{ getPageTitle() }}
          </h1>
          <p class="text-gray-600 mb-6">
            {{ filteredArtisans.length }} artisan{{ filteredArtisans.length > 1 ? 's' : '' }} trouvé{{ filteredArtisans.length > 1 ? 's' : '' }}
          </p>

          <!-- Barre de recherche -->
          <div class="search-section mb-6">
            <div class="relative max-w-md">
              <input 
                type="text"
                [(ngModel)]="searchTerm"
                (input)="filterArtisans()"
                placeholder="Rechercher un artisan..."
                class="w-full px-4 py-3 pl-10 bg-white border border-primary-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
              <svg 
                class="absolute left-3 top-1-2 transform -translate-y-1-2 w-4 h-4 text-primary-dark"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>

          <!-- Filtres par catégorie -->
          <div class="filters-section">
            <div class="flex flex-wrap gap-3">
              <button 
                (click)="filterByCategory('all')"
                [class.active]="selectedCategory === 'all'"
                class="filter-btn">
                Tous
              </button>
              <button 
                (click)="filterByCategory('batiments')"
                [class.active]="selectedCategory === 'batiments'"
                class="filter-btn">
                Bâtiments
              </button>
              <button 
                (click)="filterByCategory('services')"
                [class.active]="selectedCategory === 'services'"
                class="filter-btn">
                Services
              </button>
              <button 
                (click)="filterByCategory('fabrication')"
                [class.active]="selectedCategory === 'fabrication'"
                class="filter-btn">
                Fabrication
              </button>
              <button 
                (click)="filterByCategory('alimentation')"
                [class.active]="selectedCategory === 'alimentation'"
                class="filter-btn">
                Alimentation
              </button>
            </div>
          </div>
        </div>

        <!-- Grille des artisans -->
        <div class="artisans-grid">
          <div 
            *ngFor="let artisan of filteredArtisans; trackBy: trackByArtisan"
            class="artisan-card"
            (click)="goToArtisanDetail(artisan.id)">
            
            <!-- En-tête de la carte avec nom/entreprise -->
            <div class="card-header">
              <h3 class="artisan-name">{{ artisan.nom }}</h3>
              <p *ngIf="artisan.entreprise" class="entreprise-name">{{ artisan.entreprise }}</p>
            </div>

            <!-- Note avec étoiles -->
            <div class="rating-section">
              <div class="stars">
                <span 
                  *ngFor="let star of [1,2,3,4,5]" 
                  class="star"
                  [class.filled]="star <= artisan.note"
                  [class.empty]="star > artisan.note">
                  ★
                </span>
              </div>
              <span class="rating-text">{{ artisan.note }}/5</span>
            </div>

            <!-- Spécialité -->
            <div class="speciality-section">
              <div class="speciality-badge">
                {{ artisan.specialite }}
              </div>
            </div>

            <!-- Localisation -->
            <div class="location-section">
              <svg class="location-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span class="location-text">{{ artisan.ville }}</span>
            </div>

            <!-- Indicateur de clic -->
            <div class="click-indicator">
              <svg class="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Message si aucun résultat -->
        <div *ngIf="filteredArtisans.length === 0" class="no-results">
          <div class="no-results-content">
            <svg class="no-results-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <h3 class="no-results-title">Aucun artisan trouvé</h3>
            <p class="no-results-text">
              Essayez de modifier vos critères de recherche ou de sélectionner une autre catégorie.
            </p>
          </div>
        </div>
      </div>
    </div>
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
      --white: #ffffff;
      --gray-50: #f9fafb;
      --gray-100: #f3f4f6;
      --gray-600: #4b5563;
    }

    .artisans-list-container {
      min-height: 100vh;
      background-color: var(--primary-light);
    }

    .container {
      max-width: 1200px;
    }

    /* En-tête */
    .header-section {
      background-color: var(--white);
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;
    }

    /* Barre de recherche */
    .search-section input {
      transition: all 0.2s ease;
    }

    .search-section input:focus {
      box-shadow: 0 0 0 2px var(--primary);
      border-color: var(--primary);
    }

    /* Filtres */
    .filter-btn {
      padding: 0.75rem 1.5rem;
      background-color: var(--gray-100);
      color: var(--text-dark);
      border: none;
      border-radius: 0.5rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      border: 2px solid transparent;
    }

    .filter-btn:hover {
      background-color: var(--primary-light);
      transform: translateY(-1px);
    }

    .filter-btn.active {
      background-color: var(--primary);
      color: var(--white);
      border-color: var(--primary-dark);
    }

    /* Grille des artisans */
    .artisans-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }

    /* Cartes d'artisans */
    .artisan-card {
      background-color: var(--white);
      border-radius: 1rem;
      padding: 1.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: all 0.3s ease;
      border: 2px solid transparent;
      position: relative;
      overflow: hidden;
    }

    .artisan-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      border-color: var(--primary);
    }

    .artisan-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--primary), var(--accent-green));
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    .artisan-card:hover::before {
      transform: scaleX(1);
    }

    /* En-tête de carte */
    .card-header {
      margin-bottom: 1rem;
    }

    .artisan-name {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-dark);
      margin-bottom: 0.25rem;
    }

    .entreprise-name {
      color: var(--gray-600);
      font-size: 0.875rem;
      font-style: italic;
    }

    /* Section notation */
    .rating-section {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .stars {
      display: flex;
      gap: 0.125rem;
    }

    .star {
      font-size: 1.25rem;
      transition: all 0.2s ease;
    }

    .star.filled {
      color: #fbbf24;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .star.empty {
      color: #d1d5db;
    }

    .rating-text {
      font-size: 0.875rem;
      color: var(--gray-600);
      font-weight: 500;
    }

    /* Section spécialité */
    .speciality-section {
      margin-bottom: 1rem;
    }

    .speciality-badge {
      display: inline-block;
      background-color: var(--primary-light);
      color: var(--primary-dark);
      padding: 0.375rem 0.75rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 500;
      border: 1px solid var(--primary);
    }

    /* Section localisation */
    .location-section {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      color: var(--gray-600);
    }

    .location-icon {
      width: 1rem;
      height: 1rem;
      color: var(--primary);
    }

    .location-text {
      font-size: 0.875rem;
      font-weight: 500;
    }

    /* Indicateur de clic */
    .click-indicator {
      position: absolute;
      top: 1rem;
      right: 1rem;
      opacity: 0;
      transition: all 0.3s ease;
    }

    .artisan-card:hover .click-indicator {
      opacity: 1;
      transform: translateX(4px);
    }

    .arrow-icon {
      width: 1.25rem;
      height: 1.25rem;
      color: var(--primary);
    }

    /* Message aucun résultat */
    .no-results {
      text-align: center;
      padding: 4rem 2rem;
    }

    .no-results-content {
      max-width: 400px;
      margin: 0 auto;
    }

    .no-results-icon {
      width: 4rem;
      height: 4rem;
      color: var(--gray-600);
      margin: 0 auto 1rem;
    }

    .no-results-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-dark);
      margin-bottom: 0.5rem;
    }

    .no-results-text {
      color: var(--gray-600);
      line-height: 1.6;
    }

    /* Classes utilitaires */
    .text-4xl { font-size: 2.25rem; }
    .font-bold { font-weight: 700; }
    .text-text-dark { color: var(--text-dark); }
    .mb-4 { margin-bottom: 1rem; }
    .mb-6 { margin-bottom: 1.5rem; }
    .mb-8 { margin-bottom: 2rem; }
    .text-gray-600 { color: var(--gray-600); }
    .max-w-md { max-width: 28rem; }
    .px-4 { padding-left: 1rem; padding-right: 1rem; }
    .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
    .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
    .pl-10 { padding-left: 2.5rem; }
    .w-full { width: 100%; }
    .relative { position: relative; }
    .absolute { position: absolute; }
    .left-3 { left: 0.75rem; }
    .top-1-2 { top: 50%; }
    .transform { transform: none; }
    .-translate-y-1-2 { transform: translateY(-50%); }
    .w-4 { width: 1rem; }
    .h-4 { height: 1rem; }
    .flex { display: flex; }
    .flex-wrap { flex-wrap: wrap; }
    .gap-3 { gap: 0.75rem; }
    .bg-white { background-color: var(--white); }
    .border { border-width: 1px; }
    .border-primary-dark { border-color: var(--primary-dark); }
    .rounded-lg { border-radius: 0.5rem; }
    .focus\\:outline-none:focus { outline: none; }
    .focus\\:ring-2:focus { box-shadow: 0 0 0 2px var(--primary); }
    .focus\\:ring-primary:focus { --tw-ring-color: var(--primary); }
    .focus\\:border-transparent:focus { border-color: transparent; }
    
    /* Responsive */
    @media (max-width: 768px) {
      .artisans-grid {
        grid-template-columns: 1fr;
      }
      
      .header-section {
        padding: 1.5rem;
      }
      
      .text-4xl {
        font-size: 1.875rem;
      }
    }
  `]
})
export class ArtisansListComponent implements OnInit {
  searchTerm = '';
  selectedCategory: string = 'all';
  filteredArtisans: Artisan[] = [];
  allArtisans: Artisan[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private artisansService: ArtisansService
  ) {}

  ngOnInit(): void {
    // Charger les données des artisans
    this.artisansService.getArtisans().subscribe(artisans => {
      this.allArtisans = artisans;
      this.initializeFilters();
    });
  }

  private initializeFilters(): void {
    // Écouter les changements de route pour détecter la catégorie
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.url.split('?')[0].replace('/', '');
        
        switch (currentRoute) {
          case 'batiments':
          case 'services':
          case 'fabrication':
          case 'alimentation':
            this.selectedCategory = currentRoute;
            break;
          default:
            this.selectedCategory = 'all';
        }
        this.filterArtisans();
      }
    });

    // Détecter la catégorie initiale depuis l'URL
    const currentRoute = this.router.url.split('?')[0].replace('/', '');
    
    switch (currentRoute) {
      case 'batiments':
      case 'services':
      case 'fabrication':
      case 'alimentation':
        this.selectedCategory = currentRoute;
        break;
      default:
        this.selectedCategory = 'all';
    }

    // Récupérer les paramètres de recherche depuis l'URL
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchTerm = params['search'];
      } else {
        this.searchTerm = '';
      }
      this.filterArtisans();
    });

    // Initialiser la liste
    this.filterArtisans();
  }

  getPageTitle(): string {
    switch (this.selectedCategory) {
      case 'batiments': return 'Artisans du Bâtiment';
      case 'services': return 'Services à Domicile';
      case 'fabrication': return 'Artisans de Fabrication';
      case 'alimentation': return 'Artisans de l\'Alimentation';
      default: return 'Tous nos Artisans';
    }
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.filterArtisans();
  }

  filterArtisans(): void {
    let filtered = this.allArtisans;

    // Filtrer par catégorie
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(artisan => artisan.categorie === this.selectedCategory);
    }

    // Filtrer par terme de recherche
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(artisan =>
        artisan.nom.toLowerCase().includes(term) ||
        artisan.specialite.toLowerCase().includes(term) ||
        artisan.ville.toLowerCase().includes(term) ||
        (artisan.entreprise && artisan.entreprise.toLowerCase().includes(term))
      );
    }

    this.filteredArtisans = filtered;
  }

  goToArtisanDetail(artisanId: number): void {
    this.router.navigate(['/artisan', artisanId]);
  }

  trackByArtisan(index: number, artisan: Artisan): number {
    return artisan.id;
  }
}
