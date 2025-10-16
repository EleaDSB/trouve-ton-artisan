import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';
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
    <div class="min-h-screen bg-primary-light pt-20 md:pt-24">
      <!-- Container Mobile-First -->
      <div class="container pb-8">
        
        <!-- En-tête Mobile-First -->
        <div class="bg-white rounded-lg p-4 md:p-6 lg:p-8 mb-12 shadow-lg mt-6">
          <!-- Titre adaptatif -->
          <h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-text-dark mb-3 md:mb-4">
            {{ getPageTitle() }}
          </h1>
          
          <!-- Compteur d'artisans -->
          <p class="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
            {{ filteredArtisans.length }} artisan{{ filteredArtisans.length > 1 ? 's' : '' }} trouvé{{ filteredArtisans.length > 1 ? 's' : '' }}
          </p>

          <!-- Barre de recherche mobile-first -->
          <div>
            <div class="search-input-wrapper">
              <input
                type="text"
                [(ngModel)]="searchTerm"
                (input)="filterArtisans()"
                placeholder="Rechercher un artisan..."
                class="search-input">
              <button
                class="search-btn">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Grille des artisans mobile-first -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div 
            *ngFor="let artisan of filteredArtisans; trackBy: trackByArtisan"
            class="artisan-card bg-white rounded-lg p-4 md:p-6 shadow-lg cursor-pointer transition-all duration-200 border border-transparent hover:border-primary hover:shadow-xl touch-manipulation"
            (click)="goToArtisanDetail(artisan.id)">
            
            <!-- En-tête de la carte -->
            <div class="mb-3 md:mb-4">
              <h3 class="text-base md:text-lg font-bold text-text-dark mb-1 leading-tight">{{ artisan.nom }}</h3>
              <p *ngIf="artisan.entreprise" class="text-xs md:text-sm text-gray-600 italic">{{ artisan.entreprise }}</p>
            </div>

            <!-- Note avec étoiles mobile-first -->
            <div class="flex items-center space-x-2 mb-3">
              <div class="flex space-x-1">
                <svg *ngFor="let star of getStars(artisan.note)" 
                     class="w-4 h-4 text-yellow-400 fill-current" 
                     viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <span class="text-xs md:text-sm font-semibold text-gray-600">{{ artisan.note }}/5</span>
            </div>

            <!-- Spécialité badge mobile-first -->
            <div class="mb-3">
              <span class="inline-block bg-primary-light text-primary text-xs md:text-sm font-semibold px-3 py-1 rounded-full border border-primary/30">
                {{ artisan.specialite }}
              </span>
            </div>

            <!-- Localisation mobile-first -->
            <div class="flex items-center space-x-2 text-gray-600">
              <svg class="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span class="text-xs md:text-sm font-medium">{{ artisan.ville }}</span>
            </div>

            <!-- Indicateur de clic (desktop uniquement) -->
            <div class="hidden md:block absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all">
              <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Message si aucun résultat mobile-first -->
        <div *ngIf="filteredArtisans.length === 0" class="text-center py-12 md:py-16">
          <div class="bg-white rounded-lg p-6 md:p-8 shadow-lg max-w-md mx-auto">
            <svg class="w-12 h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <h3 class="text-lg md:text-xl font-bold text-text-dark mb-2">Aucun artisan trouvé</h3>
            <p class="text-sm md:text-base text-gray-600 leading-relaxed">
              Essayez de modifier vos critères de recherche ou de sélectionner une autre catégorie.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Variables CSS Mobile-First */
    :host {
      --primary-light: #f1f8fc;
      --primary: #0074c7;
      --primary-dark: #00497c;
      --text-dark: #384050;
      --accent-red: #cd2c2e;
      --accent-green: #82b864;
    }

    /* Classes utilitaires */
    .bg-primary-light { background-color: var(--primary-light); }
    .bg-primary { background-color: var(--primary); }
    .text-primary { color: var(--primary); }
    .text-primary-dark { color: var(--primary-dark); }
    .text-text-dark { color: var(--text-dark); }
    .border-primary { border-color: var(--primary); }
    .focus\\:ring-primary:focus { --tw-ring-color: var(--primary); }
    .hover\\:border-primary:hover { border-color: var(--primary); }

    /* Interactions tactiles mobile-first */
    .touch-manipulation {
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
    }

    /* Barre de recherche harmonisée avec le header */
    .search-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-input {
      width: 100%;
      padding: 0.75rem 1rem;
      padding-right: 3rem;
      border: none;
      border-radius: 0.5rem;
      background-color: rgba(255, 255, 255, 0.9);
      color: #384050;
      font-size: 1rem;
      outline: none;
      transition: all 0.2s ease;
      font-size: 16px; /* Évite le zoom iOS */
      -webkit-appearance: none;
    }

    .search-input:focus {
      background-color: white;
      box-shadow: 0 0 0 2px rgba(0, 116, 199, 0.3);
    }

    .search-input::placeholder {
      color: #6b7280;
    }

    .search-btn {
      position: absolute;
      right: 0.5rem;
      background: none;
      border: none;
      color: #0074c7;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 0.25rem;
      transition: all 0.2s ease;
    }

    .search-btn:hover {
      background-color: rgba(0, 116, 199, 0.1);
      color: #00497c;
    }

    /* Cartes artisans mobile-first */
    .artisan-card {
      position: relative;
      animation: slideInUp 0.4s ease-out;
    }

    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* États tactiles mobile */
    .artisan-card:active {
      transform: scale(0.98);
    }

    /* Hover effects - uniquement desktop */
    @media (min-width: 768px) {
      .artisan-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 25px -5px rgba(0, 116, 199, 0.15);
      }

      /* Animation des cartes décalée */
      .artisan-card:nth-child(1) { animation-delay: 0.1s; }
      .artisan-card:nth-child(2) { animation-delay: 0.15s; }
      .artisan-card:nth-child(3) { animation-delay: 0.2s; }
      .artisan-card:nth-child(4) { animation-delay: 0.25s; }
      .artisan-card:nth-child(5) { animation-delay: 0.3s; }
      .artisan-card:nth-child(6) { animation-delay: 0.35s; }

      /* Gradient top border animation */
      .artisan-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary), var(--accent-green));
        transform: scaleX(0);
        transition: transform 0.3s ease;
      }

      .artisan-card:hover::before {
        transform: scaleX(1);
      }
    }

    /* Desktop improvements */
    @media (min-width: 1024px) {
      /* Animations plus fluides */
      .artisan-card {
        transition: all 0.3s ease;
      }

      .artisan-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 25px 35px -5px rgba(0, 116, 199, 0.2);
      }

      /* Effet de groupe pour les indicateurs */
      .artisan-card {
        group: true;
      }
    }

    /* Accessibilité */
    button:focus,
    input:focus {
      outline: 2px solid var(--primary);
      outline-offset: 2px;
    }

    /* Performance - GPU acceleration */
    .artisan-card {
      transform: translateZ(0);
      will-change: transform;
    }

    /* Réduction de mouvement */
    @media (prefers-reduced-motion: reduce) {
      * {
        animation: none !important;
        transition: none !important;
      }
    }

    /* Forcer le fond blanc pour tous les blocs */
    .bg-white {
      background-color: #ffffff !important;
      color: #384050 !important;
    }

    /* Mode sombre désactivé pour garder fond blanc */
    @media (prefers-color-scheme: dark) {
      .bg-white {
        background-color: #ffffff !important;
        color: #384050 !important;
      }

      input {
        background-color: var(--primary-light) !important;
        color: #384050 !important;
        border-color: rgba(0, 116, 199, 0.3) !important;
      }
    }
  `]
})
export class ArtisansListComponent implements OnInit {
  searchTerm = '';
  selectedCategory: string = 'all';
  filteredArtisans: Artisan[] = [];
  allArtisans: Artisan[] = [];
  private destroyRef = inject(DestroyRef);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private artisansService: ArtisansService
  ) {}

  ngOnInit(): void {
    // Charger les données des artisans
    this.artisansService.getArtisans().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (artisans) => {
        this.allArtisans = artisans;
        this.initializeFilters();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des artisans:', error);
        this.filteredArtisans = [];
      }
    });
  }

  private initializeFilters(): void {
    // Écouter les changements de route pour détecter la catégorie
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((event) => {
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
    this.route.queryParams.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(params => {
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

  /**
   * Génère un tableau d'étoiles pour l'affichage des notes
   */
  getStars(note: number): number[] {
    const fullStars = Math.floor(note);
    return Array(fullStars).fill(0);
  }
}
