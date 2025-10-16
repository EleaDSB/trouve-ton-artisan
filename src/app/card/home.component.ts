import { Component, OnInit, inject, DestroyRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ArtisansService } from '../services/artisans.service';
import { Artisan } from '../models/artisan.model';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen" style="background-color: #f1f8fc;">

      <!-- Section Comment trouver mon artisan -->
      <section class="py-6 px-4 md:py-12 md:px-6 lg:py-16">
        <div class="container-custom">

          <!-- Titre -->
          <div class="text-center mb-8 md:mb-12">
            <h2 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4 lg:mb-6 px-4" style="color: #384050;">
              Comment trouver ton artisan ?
            </h2>
            <p class="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Trouvez l'artisan parfait en 4 étapes simples
            </p>
          </div>

          <!-- Grid des étapes -->
          <div class="steps-grid">

            <!-- Étape 1 -->
            <div class="step-card">
              <div class="text-center">
                <div class="step-number" style="background-color: #0074c7;">
                  1
                </div>
                <svg class="step-icon" style="color: #0074c7;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                </svg>
                <h3 class="step-title" style="color: #384050;">
                  Choisir la catégorie
                </h3>
                <p class="step-description">
                  Sélectionnez la catégorie dans le menu
                </p>
              </div>
            </div>

            <!-- Étape 2 -->
            <div class="step-card">
              <div class="text-center">
                <div class="step-number" style="background-color: #0074c7;">
                  2
                </div>
                <svg class="step-icon" style="color: #0074c7;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                <h3 class="step-title" style="color: #384050;">
                  Choisir un artisan
                </h3>
                <p class="step-description">
                  Parcourez les profils disponibles
                </p>
              </div>
            </div>

            <!-- Étape 3 -->
            <div class="step-card">
              <div class="text-center">
                <div class="step-number" style="background-color: #0074c7;">
                  3
                </div>
                <svg class="step-icon" style="color: #0074c7;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <h3 class="step-title" style="color: #384050;">
                  Le contacter
                </h3>
                <p class="step-description">
                  Utilisez le formulaire de contact
                </p>
              </div>
            </div>

            <!-- Étape 4 -->
            <div class="step-card">
              <div class="text-center">
                <div class="step-number" style="background-color: #82b864;">
                  4
                </div>
                <svg class="step-icon" style="color: #82b864;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <h3 class="step-title" style="color: #384050;">
                  Réponse sous 48h
                </h3>
                <p class="step-description">
                  Réponse garantie sous 48h
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section Les artisans du mois -->
      <section class="py-8 px-4 md:py-12 md:px-6 lg:py-16 bg-white">
        <div class="container-custom">

          <!-- Titre -->
          <div class="text-center mb-8 md:mb-12">
            <h2 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4 lg:mb-6 px-4" style="color: #384050;">
              Les artisans du mois
            </h2>
            <p class="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Découvrez nos artisans les mieux notés ce mois-ci
            </p>
          </div>

          <!-- Grid des artisans -->
          <div class="artisans-grid">
            
            <div *ngFor="let artisan of artisans"
                 class="artisan-card"
                 (click)="selectArtisan(artisan)">
              
              <div class="text-center">
                <!-- Avatar -->
                <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform" style="background-color: #0074c7;">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                
                <!-- Nom -->
                <h3 class="text-xl font-bold mb-2" style="color: #384050;">{{ artisan?.nom }}</h3>
                
                <!-- Note avec étoiles -->
                <div class="flex items-center justify-center space-x-2 mb-3">
                  <div class="flex space-x-1">
                    <svg *ngFor="let star of getStars(artisan?.note || 0)" 
                         class="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <span class="text-sm text-gray-600 font-semibold">({{ artisan?.note }}/5)</span>
                </div>
                
                <!-- Spécialité -->
                <p class="font-semibold mb-3" style="color: #0074c7;">{{ artisan?.specialite }}</p>
                
                <!-- Localisation -->
                <div class="flex items-center justify-center space-x-1 text-gray-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span class="text-sm">{{ artisan?.ville }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    /* Container personnalisé */
    .container-custom {
      max-width: 1280px;
      margin: 0 auto;
      width: 100%;
    }

    /* Grid des étapes - Mobile first */
    .steps-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    /* Carte d'étape */
    .step-card {
      background-color: white;
      border-radius: 1rem;
      padding: 1.5rem 1rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .step-card:active {
      transform: scale(0.98);
    }

    /* Numéro de l'étape */
    .step-number {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      font-weight: bold;
      margin: 0 auto 1rem;
      color: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    }

    /* Icône de l'étape */
    .step-icon {
      width: 2.5rem;
      height: 2.5rem;
      margin: 0 auto 1rem;
    }

    /* Titre de l'étape */
    .step-title {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      line-height: 1.4;
    }

    /* Description de l'étape */
    .step-description {
      font-size: 0.875rem;
      color: #6b7280;
      line-height: 1.5;
    }

    /* Grid des artisans - Mobile first */
    .artisans-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    /* Carte artisan */
    .artisan-card {
      background-color: #f1f8fc;
      border-radius: 1rem;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border: 2px solid transparent;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .artisan-card:hover {
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
      border-color: #0074c7;
      transform: translateY(-4px);
    }

    .artisan-card:active {
      transform: translateY(-2px) scale(0.98);
    }

    /* Tablette (640px+) */
    @media (min-width: 640px) {
      .steps-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
      }

      .step-card {
        padding: 2rem 1.5rem;
      }

      .step-number {
        width: 3.5rem;
        height: 3.5rem;
        font-size: 1.5rem;
      }

      .step-icon {
        width: 3rem;
        height: 3rem;
      }

      .step-title {
        font-size: 1.25rem;
      }

      .step-description {
        font-size: 1rem;
      }
    }

    /* Tablette (768px+) */
    @media (min-width: 768px) {
      .artisans-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
      }

      .artisan-card {
        padding: 2rem;
      }

      .step-card:hover {
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        transform: translateY(-4px);
        border-color: #0074c7;
      }
    }

    /* Desktop (1024px+) */
    @media (min-width: 1024px) {
      .steps-grid {
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        margin-bottom: 3rem;
      }

      .artisans-grid {
        grid-template-columns: repeat(3, 1fr);
      }

      .step-card {
        padding: 2.5rem 2rem;
      }
    }

    /* Large desktop (1280px+) */
    @media (min-width: 1280px) {
      .steps-grid {
        gap: 2.5rem;
      }

      .artisans-grid {
        gap: 2.5rem;
      }
    }
  `]
})
export class HomeComponent implements OnInit {

  // Données des artisans du mois
  artisans: Artisan[] = [];
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  constructor(
    private artisansService: ArtisansService,
    private router: Router,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.setSEOData();
    this.loadTopArtisans();
  }

  /**
   * Configuration des métadonnées SEO pour la page d'accueil
   */
  private setSEOData(): void {
    // Titre de la page
    this.titleService.setTitle('Trouve Ton Artisan - Artisans qualifiés près de chez vous');

    // Meta description optimisée pour le SEO
    this.metaService.updateTag({
      name: 'description',
      content: 'Trouvez l\'artisan parfait près de chez vous ! Découvrez nos artisans qualifiés spécialisés dans le bâtiment, les services à domicile, la fabrication et l\'alimentation. Réponse garantie sous 48h.'
    });

    // Mots-clés pour le référencement
    this.metaService.updateTag({
      name: 'keywords',
      content: 'artisan, artisans qualifiés, bâtiment, services, fabrication, alimentation, devis, réparation, construction, près de chez vous'
    });

    // Métadonnées Open Graph pour les réseaux sociaux
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Trouve Ton Artisan - Artisans qualifiés près de chez vous'
    });

    this.metaService.updateTag({
      property: 'og:description',
      content: 'Trouvez l\'artisan parfait près de chez vous ! Artisans qualifiés dans le bâtiment, services, fabrication et alimentation. Réponse garantie sous 48h.'
    });

    this.metaService.updateTag({
      property: 'og:type',
      content: 'website'
    });

    this.metaService.updateTag({
      property: 'og:url',
      content: 'https://trouve-ton-artisan.fr'
    });

    // Métadonnées Twitter Card
    this.metaService.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image'
    });

    this.metaService.updateTag({
      name: 'twitter:title',
      content: 'Trouve Ton Artisan - Artisans qualifiés près de chez vous'
    });

    this.metaService.updateTag({
      name: 'twitter:description',
      content: 'Trouvez l\'artisan parfait près de chez vous ! Artisans qualifiés, réponse garantie sous 48h.'
    });

    // Informations pour les moteurs de recherche locaux
    this.metaService.updateTag({
      name: 'geo.region',
      content: 'FR'
    });

    this.metaService.updateTag({
      name: 'geo.placename',
      content: 'France'
    });

    // Indication aux moteurs de recherche
    this.metaService.updateTag({
      name: 'robots',
      content: 'index, follow'
    });

    // Canonical URL
    this.metaService.updateTag({
      rel: 'canonical',
      href: 'https://trouve-ton-artisan.fr'
    });

    // Langue du contenu
    this.metaService.updateTag({
      name: 'language',
      content: 'fr-FR'
    });
  }

  private loadTopArtisans(): void {
    this.artisansService.getArtisans().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (artisans) => {
        // Prendre les 3 premiers artisans les mieux notés
        this.artisans = artisans
          .sort((a, b) => b.note - a.note)
          .slice(0, 3);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des artisans du mois:', error);
        this.artisans = [];
        this.cdr.markForCheck();
      }
    });
  }

  /**
   * Génère un tableau d'étoiles pour l'affichage des notes
   */
  getStars(note: number): number[] {
    const fullStars = Math.floor(note);
    return Array(fullStars).fill(0);
  }

  /**
   * Sélectionner un artisan (navigation vers sa page)
   */
  selectArtisan(artisan: any): void {
    this.router.navigate(['/artisan', artisan.id]);
  }
}