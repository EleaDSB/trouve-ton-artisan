import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ArtisansService } from '../services/artisans.service';
import { EmailService } from '../services/email.service';
import { Artisan } from '../models/artisan.model';

@Component({
  selector: 'app-artisan-details',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
  template: `
    <div class="min-h-screen bg-primary-light " style="padding-top: 30px;">
      
      <!-- Bouton retour -->
      <div class="container mb-6">
        <button 
          (click)="goBack()"
          class="flex items-center px-4 py-3 bg-accent-green text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
          style="margin-left: 0; margin-right: auto; display: inline-flex;">
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Retour à la liste
        </button>
      </div>

      <!-- États de chargement/erreur -->
      <div *ngIf="isLoading" class="container py-16 text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p class="mt-4 text-gray-600 text-sm">Chargement...</p>
      </div>

      <div *ngIf="!isLoading && !artisan" class="container py-16 text-center">
        <svg class="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"></path>
        </svg>
        <h2 class="text-xl font-bold text-text-dark mb-2">Artisan non trouvé</h2>
        <p class="text-gray-600 text-sm">L'artisan que vous recherchez n'existe pas.</p>
      </div>

      <!-- Contenu principal -->
      <div *ngIf="!isLoading && artisan" class="container pb-8">
        
        <!-- En-tête artisan -->
        <div class="bg-white rounded-lg shadow-lg p-4 mb-6">
          
          <!-- Avatar et nom -->
          <div class="flex items-start space-x-6 mb-4">
            <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <h1 class="text-xl font-bold text-text-dark leading-tight">{{ artisan.nom }}</h1>
              <p *ngIf="artisan.entreprise" class="text-primary font-semibold text-sm mt-1">{{ artisan.entreprise }}</p>
            </div>
          </div>

          <!-- Note -->
          <div class="flex items-center space-x-2 mb-4">
            <div class="flex space-x-1">
              <svg *ngFor="let star of getStars(artisan.note)" 
                   class="w-4 h-4 text-yellow-400 fill-current" 
                   viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            <span class="text-sm font-semibold text-text-dark">{{ artisan.note }}/5</span>
          </div>

          <!-- Spécialité et ville -->
          <div class="space-y-2 mb-4">
            <div class="flex items-center">
              <svg class="w-4 h-4 text-primary mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.78 0-2.678-2.153-1.415-3.414l5-5A2 2 0 009 11.172V5L8 4z"/>
              </svg>
              <span class="text-text-dark text-sm">{{ artisan.specialite }}</span>
            </div>
            <div class="flex items-center">
              <svg class="w-4 h-4 text-primary mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span class="text-text-dark text-sm">{{ artisan.ville }}</span>
            </div>
          </div>

          <!-- Site web -->
          <div *ngIf="artisan.siteWeb" class="pt-3 border-t border-gray-100">
            <a 
              [href]="artisan.siteWeb" 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center w-full justify-center px-6 py-3 bg-primary text-white text-base rounded-lg hover:bg-primary-dark transition-colors duration-200">
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              Voir le site web
            </a>
          </div>
        </div>

        <!-- Section À propos -->
        <div class="bg-white rounded-lg shadow-lg p-4 mb-6">
          <h2 class="text-lg font-bold text-text-dark mb-4 flex items-center">
            <svg class="w-5 h-5 text-primary mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            À propos
          </h2>
          
          <p class="text-gray-700 text-sm leading-relaxed mb-4">{{ artisan.aPropos }}</p>
          
          <!-- Coordonnées -->
          <div class="border-t border-gray-100 pt-4">
            <h3 class="font-semibold text-text-dark mb-3 text-sm">Coordonnées</h3>
            
            <div class="space-y-3">
              <a href="tel:{{ artisan.telephone }}" class="flex items-center text-primary hover:text-primary-dark transition-colors">
                <svg class="w-4 h-4 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span class="text-sm">{{ artisan.telephone }}</span>
              </a>
              
              <a href="mailto:{{ artisan.email }}" class="flex items-center text-primary hover:text-primary-dark transition-colors">
                <svg class="w-4 h-4 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span class="text-sm">{{ artisan.email }}</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Formulaire de contact -->
        <div class="bg-white rounded-lg shadow-lg p-4">
          <h2 class="text-lg font-bold text-text-dark mb-4 flex items-center">
            <svg class="w-5 h-5 text-primary mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            Contacter {{ artisan.nom }}
          </h2>

          <!-- Message de statut -->
          <div *ngIf="contactMessage" 
               class="p-3 rounded-lg mb-4 text-sm"
               [class.bg-green-50]="contactMessageType === 'success'"
               [class.text-green-800]="contactMessageType === 'success'"
               [class.bg-red-50]="contactMessageType === 'error'"
               [class.text-red-800]="contactMessageType === 'error'">
            {{ contactMessage }}
          </div>

          <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-4">
            
            <!-- Nom -->
            <div>
              <label for="nom" class="block text-sm font-medium text-text-dark mb-2">
                Nom complet <span class="text-red-500">*</span>
              </label>
              <input
                id="nom"
                type="text"
                formControlName="nom"
                class="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Votre nom complet">

              <div *ngIf="contactForm.get('nom')?.invalid && contactForm.get('nom')?.touched"
                   class="mt-1 text-xs text-red-600">
                Le nom est requis
              </div>
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-text-dark mb-2">
                Email <span class="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                formControlName="email"
                class="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="votre.email@exemple.com">

              <div *ngIf="contactForm.get('email')?.invalid && contactForm.get('email')?.touched"
                   class="mt-1 text-xs text-red-600">
                Un email valide est requis
              </div>
            </div>

            <!-- Objet -->
            <div>
              <label for="objet" class="block text-sm font-medium text-text-dark mb-2">
                Objet <span class="text-red-500">*</span>
              </label>
              <input 
                id="objet"
                type="text" 
                formControlName="objet"
                class="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="L'objet de votre message">
              
              <div *ngIf="contactForm.get('objet')?.invalid && contactForm.get('objet')?.touched" 
                   class="mt-1 text-xs text-red-600">
                L'objet est requis
              </div>
            </div>

            <!-- Message -->
            <div>
              <label for="message" class="block text-sm font-medium text-text-dark mb-2">
                Message <span class="text-red-500">*</span>
              </label>
              <textarea 
                id="message"
                formControlName="message"
                rows="4"
                class="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Décrivez votre demande..."></textarea>
              
              <div *ngIf="contactForm.get('message')?.invalid && contactForm.get('message')?.touched" 
                   class="mt-1 text-xs text-red-600">
                Le message est requis (minimum 10 caractères)
              </div>
            </div>

            <!-- Bouton d'envoi -->
            <div class="flex justify-center mt-6">
              <button 
                type="submit"
                [disabled]="contactForm.invalid || isSubmitting"
                class="px-8 py-4 bg-primary text-white text-base font-semibold rounded-lg hover:bg-primary-dark transition-colors duration-200 disabled:opacity-50 flex items-center justify-center min-w-[200px]">
                
                <svg *ngIf="isSubmitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                
                <svg *ngIf="!isSubmitting" class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
                
                {{ isSubmitting ? 'Envoi...' : 'Envoyer le message' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Variables CSS */
    :host {
      --primary-light: #f1f8fc;
      --primary: #0074c7;
      --primary-dark: #00497c;
      --text-dark: #384050;
      --accent-red: #cd2c2e;
      --accent-green: #82b864;
    }

    /* Classes utilitaires - Mobile First */
    .bg-primary-light { background-color: var(--primary-light); }
    .bg-primary { background-color: var(--primary); }
    .bg-accent-green { background-color: var(--accent-green); }
    .text-primary { color: var(--primary); }
    .text-primary-dark { color: var(--primary-dark); }
    .text-text-dark { color: var(--text-dark); }
    .hover\\:bg-primary-dark:hover { background-color: var(--primary-dark); }
    .hover\\:bg-green-600:hover { background-color: #059669; }
    .hover\\:text-primary-dark:hover { color: var(--primary-dark); }
    
    .focus\\:ring-primary:focus {
      --tw-ring-color: var(--primary);
      box-shadow: 0 0 0 2px var(--primary);
    }

    /* Animations mobile-first */
    .bg-white {
      animation: slideInUp 0.4s ease-out;
      transition: all 0.2s ease;
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

    /* Interactions tactiles optimisées */
    button, a {
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
    }

    /* Focus states mobile */
    input:focus,
    textarea:focus,
    button:focus {
      outline: 2px solid var(--primary);
      outline-offset: 2px;
    }

    /* Styles pour les inputs mobiles */
    input, textarea {
      font-size: 16px; /* Évite le zoom sur iOS */
      -webkit-appearance: none;
      border-radius: 8px;
    }

    /* Amélioration des contrastes pour mobile */
    .text-gray-700 { color: #374151; }
    .text-gray-600 { color: #4b5563; }

    /* Responsive - Desktop improvements */
    @media (min-width: 768px) {
      /* Container plus large sur desktop */
      .px-4 {
        padding-left: 2rem;
        padding-right: 2rem;
      }

      /* Hover effects pour desktop uniquement */
      .bg-white:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      }

      /* Bouton retour plus petit sur desktop */
      button {
        width: auto !important;
      }

      /* Textes plus grands sur desktop */
      h1 {
        font-size: 2rem !important;
      }

      h2 {
        font-size: 1.5rem !important;
      }

      /* Padding plus généreux sur desktop */
      .p-4 {
        padding: 2rem;
      }

      /* Grid layout pour desktop */
      .space-y-6 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        margin-top: 0;
      }

      .space-y-6 > * + * {
        margin-top: 0;
      }
    }

    /* Large screens - layout optimizations */
    @media (min-width: 1024px) {
      /* Container max width */
      .px-4 {
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
      }

      /* Formulaire side-by-side */
      .space-y-4 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-top: 0;
      }

      .space-y-4 > div:nth-last-child(-n+2) {
        grid-column: 1 / -1;
      }

      .space-y-4 > * + * {
        margin-top: 0;
      }
    }

    /* Accessibilité et performance */
    * {
      scroll-behavior: smooth;
    }

    @media (prefers-reduced-motion: reduce) {
      * {
        animation: none !important;
        transition: none !important;
      }
    }

    /* Garantir le fond blanc pour tous les blocs */
    .bg-white {
      background-color: #ffffff !important;
      color: #384050;
    }

    /* Dark mode désactivé pour garder fond blanc */
    @media (prefers-color-scheme: dark) {
      .bg-white {
        background-color: #ffffff !important;
        color: #384050 !important;
      }
      
      .text-gray-700 {
        color: #374151 !important;
      }
      
      .border-gray-100 {
        border-color: #e5e7eb !important;
      }
    }
  `]
})
export class ArtisanDetailsComponent implements OnInit {
  artisan: Artisan | null = null;
  isLoading = true;
  contactForm: FormGroup;
  contactMessage = '';
  contactMessageType: 'success' | 'error' = 'success';
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private artisansService: ArtisansService,
    private emailService: EmailService,
    private fb: FormBuilder
  ) {
    // Initialisation du formulaire de contact
    this.contactForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      objet: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.loadArtisanDetails();
  }

  /**
   * Charger les détails de l'artisan
   */
  private loadArtisanDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (!id) {
      this.isLoading = false;
      return;
    }

    this.artisansService.getArtisanById(parseInt(id, 10)).subscribe({
      next: (artisan) => {
        this.artisan = artisan || null;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement de l\'artisan:', error);
        this.isLoading = false;
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
   * Retour à la liste des artisans
   */
  goBack(): void {
    this.router.navigate(['/artisans']);
  }

  /**
   * Soumission du formulaire de contact
   */
  onSubmit(): void {
    if (this.contactForm.invalid || !this.artisan || !this.artisan.email) {
      return;
    }

    this.isSubmitting = true;
    this.contactMessage = '';

    const formData = this.contactForm.value;

    // Préparer les données pour l'API
    const contactData = {
      nom: formData.nom,
      email: formData.email,
      objet: formData.objet,
      message: formData.message,
      artisanEmail: this.artisan.email,
      artisanNom: this.artisan.nom
    };

    // Envoi via le service email
    this.emailService.sendContactEmail(contactData).subscribe({
      next: (response) => {
        if (response.success) {
          this.contactMessage = response.message || 'Votre message a été envoyé avec succès ! L\'artisan vous répondra sous 48h.';
          this.contactMessageType = 'success';
          this.contactForm.reset();
        } else {
          this.contactMessage = response.error || 'Une erreur est survenue lors de l\'envoi.';
          this.contactMessageType = 'error';
        }
        this.isSubmitting = false;

        // Masquer le message après 5 secondes
        setTimeout(() => {
          this.contactMessage = '';
        }, 5000);
      },
      error: (error) => {
        console.error('Erreur lors de l\'envoi du message:', error);
        this.contactMessage = error.error?.error || 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.';
        this.contactMessageType = 'error';
        this.isSubmitting = false;

        // Masquer le message après 5 secondes
        setTimeout(() => {
          this.contactMessage = '';
        }, 5000);
      }
    });
  }
}