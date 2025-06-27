import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArtisansService } from '../services/artisans.service';
import { Artisan } from '../models/artisan.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-primary-light">

      <!-- Section Comment trouver mon artisan -->
      <section class="py-16">
        <div class="container mx-auto px-4">
          <!-- Titre de la section -->
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-text-dark mb-6">
              Comment trouver ton artisan ?
            </h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              Trouvez l'artisan parfait en 4 étapes simples
            </p>
          </div>

          <!-- Grid des 4 étapes horizontales -->
          <div class="steps-container max-w-6xl mx-auto mb-16">
            
            <!-- Étape 1 -->
            <div class="step-card bg-white rounded-lg p-4 text-center hover:shadow-lg transition-all duration-300 aspect-square flex flex-col justify-center">
              <div class="step-number bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">
                1
              </div>
              <div class="step-icon mb-2">
                <svg class="w-10 h-10 mx-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                </svg>
              </div>
              <div class="border-t border-gray-200 my-2"></div>
              <h3 class="text-md font-semibold text-text-dark mb-1">
                Choisir la catégorie
              </h3>
              <p class="text-sm text-gray-600 leading-relaxed">
                Choisir la catégorie dans le menu
              </p>
            </div>

            <!-- Étape 2 -->
            <div class="step-card bg-white rounded-lg p-4 text-center hover:shadow-lg transition-all duration-300 aspect-square flex flex-col justify-center">
              <div class="step-number bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">
                2
              </div>
              <div class="step-icon mb-2">
                <svg class="w-10 h-10 mx-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <div class="border-t border-gray-200 my-2"></div>
              <h3 class="text-md font-semibold text-text-dark mb-1">
                Choisir un artisan
              </h3>
              <p class="text-sm text-gray-600 leading-relaxed">
                Choisir un artisan
              </p>
            </div>

            <!-- Étape 3 -->
            <div class="step-card bg-white rounded-lg p-4 text-center hover:shadow-lg transition-all duration-300 aspect-square flex flex-col justify-center">
              <div class="step-number bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">
                3
              </div>
              <div class="step-icon mb-2">
                <svg class="w-10 h-10 mx-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div class="border-t border-gray-200 my-2"></div>
              <h3 class="text-md font-semibold text-text-dark mb-1">
                Le contacter
              </h3>
              <p class="text-sm text-gray-600 leading-relaxed">
                Le contacter via le formulaire de contact
              </p>
            </div>

            <!-- Étape 4 -->
            <div class="step-card bg-white rounded-lg p-4 text-center hover:shadow-lg transition-all duration-300 aspect-square flex flex-col justify-center">
              <div class="step-number bg-accent-green text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">
                4
              </div>
              <div class="step-icon mb-2">
                <svg class="w-10 h-10 mx-auto text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="border-t border-gray-200 my-2"></div>
              <h3 class="text-md font-semibold text-text-dark mb-1">
                Réponse sous 48h
              </h3>
              <p class="text-sm text-gray-600 leading-relaxed">
                Une réponse sera apportée sous 48h
              </p>
            </div>

          </div>
        </div>
      </section>

      <!-- Section Les artisans du mois -->
      <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <!-- Titre de la section -->
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-text-dark mb-6">
              Les artisans du mois
            </h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez nos artisans les mieux notés ce mois-ci
            </p>
          </div>

          <!-- Grid des 3 artisans -->
          <div class="artisans-container max-w-6xl mx-auto">
            
            <!-- Artisan 1 -->
            <div *ngIf="artisans[0]" class="artisan-card bg-primary-light rounded-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-primary aspect-square flex flex-col justify-center"
                 (click)="selectArtisan(artisans[0])">
              <div class="text-center mb-4">
                <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <h3 class="text-lg font-bold text-text-dark mb-2">{{ artisans[0]?.nom }}</h3>
                
                <!-- Étoiles -->
                <div class="flex justify-center mb-3">
                  <div class="flex space-x-1">
                    <svg *ngFor="let star of getStars(artisans[0]?.note || 0)" class="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <span class="ml-2 text-sm text-gray-600">({{ artisans[0]?.note }}/5)</span>
                </div>
                
                <p class="text-primary font-semibold mb-2">{{ artisans[0]?.specialite }}</p>
                <p class="text-gray-600 text-sm flex items-center justify-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  {{ artisans[0]?.ville }}
                </p>
              </div>
            </div>

            <!-- Artisan 2 -->
            <div *ngIf="artisans[1]" class="artisan-card bg-primary-light rounded-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-primary aspect-square flex flex-col justify-center"
                 (click)="selectArtisan(artisans[1])">
              <div class="text-center mb-4">
                <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <h3 class="text-lg font-bold text-text-dark mb-2">{{ artisans[1]?.nom }}</h3>
                
                <!-- Étoiles -->
                <div class="flex justify-center mb-3">
                  <div class="flex space-x-1">
                    <svg *ngFor="let star of getStars(artisans[1]?.note || 0)" class="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <span class="ml-2 text-sm text-gray-600">({{ artisans[1]?.note }}/5)</span>
                </div>
                
                <p class="text-primary font-semibold mb-2">{{ artisans[1]?.specialite }}</p>
                <p class="text-gray-600 text-sm flex items-center justify-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  {{ artisans[1]?.ville }}
                </p>
              </div>
            </div>

            <!-- Artisan 3 -->
            <div *ngIf="artisans[2]" class="artisan-card bg-primary-light rounded-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-primary aspect-square flex flex-col justify-center"
                 (click)="selectArtisan(artisans[2])">
              <div class="text-center mb-4">
                <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <h3 class="text-lg font-bold text-text-dark mb-2">{{ artisans[2]?.nom }}</h3>
                
                <!-- Étoiles -->
                <div class="flex justify-center mb-3">
                  <div class="flex space-x-1">
                    <svg *ngFor="let star of getStars(artisans[2]?.note || 0)" class="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <span class="ml-2 text-sm text-gray-600">({{ artisans[2]?.note }}/5)</span>
                </div>
                
                <p class="text-primary font-semibold mb-2">{{ artisans[2]?.specialite }}</p>
                <p class="text-gray-600 text-sm flex items-center justify-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  {{ artisans[2]?.ville }}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  `,
  styles: [`
    /* Variables CSS locales */
    :host {
      --primary-light: #f1f8fc;
      --primary: #0074c7;
      --primary-dark: #00497c;
      --text-dark: #384050;
      --accent-red: #cd2c2e;
      --accent-green: #82b864;
    }

    /* Styles pour les cartes d'étapes */
    .step-card {
      position: relative;
      transition: all 0.3s ease;
      border: 2px solid transparent;
      height: 100%;
    }

    .step-card:hover {
      transform: translateY(-8px);
      border-color: var(--primary);
      box-shadow: 0 20px 40px rgba(0, 116, 199, 0.1);
    }

    .step-number {
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(0, 116, 199, 0.3);
    }

    .step-card:hover .step-number {
      transform: scale(1.1);
      box-shadow: 0 6px 20px rgba(0, 116, 199, 0.4);
    }

    .step-icon {
      transition: all 0.3s ease;
    }

    .step-card:hover .step-icon {
      transform: scale(1.1);
    }

    /* Styles pour les cartes d'artisans */
    .artisan-card {
      transition: all 0.3s ease;
      height: 100%;
    }

    .artisan-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 35px rgba(0, 116, 199, 0.15);
    }

    /* Animation d'apparition */
    .step-card, .artisan-card {
      animation: fadeInUp 0.6s ease-out;
    }

    .step-card:nth-child(1) { animation-delay: 0.1s; }
    .step-card:nth-child(2) { animation-delay: 0.2s; }
    .step-card:nth-child(3) { animation-delay: 0.3s; }
    .step-card:nth-child(4) { animation-delay: 0.4s; }

    .artisan-card:nth-child(1) { animation-delay: 0.1s; }
    .artisan-card:nth-child(2) { animation-delay: 0.2s; }
    .artisan-card:nth-child(3) { animation-delay: 0.3s; }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Classes utilitaires pour les couleurs */
    .bg-primary-light { background-color: var(--primary-light); }
    .bg-primary { background-color: var(--primary); }
    .text-primary { color: var(--primary); }
    .text-text-dark { color: var(--text-dark); }
    .text-accent-green { color: var(--accent-green); }
    .bg-accent-green { background-color: var(--accent-green); }

    /* Responsive */
    @media (max-width: 768px) {
      .step-card, .artisan-card {
        margin-bottom: 1.5rem;
      }
      
      .step-number {
        width: 2.5rem;
        height: 2.5rem;
        font-size: 1rem;
      }
      
      .step-icon svg {
        width: 2rem;
        height: 2rem;
      }
      
      h3 {
        font-size: 1rem;
      }
      
      p {
        font-size: 0.875rem;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  
  // Données des artisans du mois
  artisans: Artisan[] = [];

  constructor(private artisansService: ArtisansService) {}

  ngOnInit(): void {
    this.loadTopArtisans();
  }

  private loadTopArtisans(): void {
    this.artisansService.getArtisans().subscribe(artisans => {
      // Prendre les 3 premiers artisans les mieux notés
      this.artisans = artisans
        .sort((a, b) => b.note - a.note)
        .slice(0, 3);
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
    console.log('Artisan sélectionné:', artisan);
    // Ici on pourrait naviguer vers la page de l'artisan
    // this.router.navigate(['/artisan', artisan.id]);
  }
}