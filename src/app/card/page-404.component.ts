import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-404',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  template: `
    <div class="min-h-screen bg-primary-light pt-20 md:pt-24 flex items-center justify-center">
      <div class="px-4 mx-auto max-w-4xl text-center">
        
        <!-- Numéro 404 -->
        <div class="mb-8">
          <h1 class="text-10xl md:text-9xl lg:text-[12rem] font-bold text-primary opacity-20 leading-none">
            404
          </h1>
        </div>

        <!-- Illustration SVG -->
        <div class="mb-8">
          <svg class="w-16 h-16 md:w-32 md:h-32 mx-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
        </div>

        <!-- Titre principal -->
        <div class="mb-12">
          <h2 class="text-2xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-4">
            Oups ! Page introuvable
          </h2>
          <p class="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            La page que vous recherchez n'existe pas ou a été déplacée. 
            Mais ne vous inquiétez pas, nos artisans sont toujours là pour vous aider !
          </p>
        </div>

        <!-- Boutons d'action -->
        <div class="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
          
          <!-- Bouton retour accueil -->
          <button 
            (click)="goHome()"
            class="w-full sm:w-auto px-8 py-4 bg-primary text-white text-base font-semibold rounded-lg hover:bg-primary-dark transition-all duration-200 flex items-center justify-center touch-manipulation">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            Retour à l'accueil
          </button>

          <!-- Bouton voir artisans -->
          <button 
            (click)="goToArtisans()"
            class="w-full sm:w-auto px-8 py-4 bg-accent-green text-white text-base font-semibold rounded-lg hover:bg-green-600 transition-all duration-200 flex items-center justify-center touch-manipulation">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            Voir nos artisans
          </button>
        </div>

        <!-- Suggestions utiles -->
        <div class="bg-white rounded-xl p-6 md:p-8 shadow-lg max-w-2xl mx-auto">
          <h3 class="text-lg md:text-xl font-bold text-text-dark mb-4">
            Vous cherchez peut-être...
          </h3>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <!-- Bâtiments -->
            <button 
              (click)="goToCategory('batiments')"
              class="p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary-light transition-all duration-200 text-center touch-manipulation">
              <svg class="w-8 h-8 text-primary mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
              <span class="text-sm font-medium text-text-dark">Bâtiments</span>
            </button>

            <!-- Services -->
            <button 
              (click)="goToCategory('services')"
              class="p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary-light transition-all duration-200 text-center touch-manipulation">
              <svg class="w-8 h-8 text-primary mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span class="text-sm font-medium text-text-dark">Services</span>
            </button>

            <!-- Fabrication -->
            <button 
              (click)="goToCategory('fabrication')"
              class="p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary-light transition-all duration-200 text-center touch-manipulation">
              <svg class="w-8 h-8 text-primary mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.78 0-2.678-2.153-1.415-3.414l5-5A2 2 0 009 11.172V5L8 4z"/>
              </svg>
              <span class="text-sm font-medium text-text-dark">Fabrication</span>
            </button>

            <!-- Alimentation -->
            <button 
              (click)="goToCategory('alimentation')"
              class="p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary-light transition-all duration-200 text-center touch-manipulation">
              <svg class="w-8 h-8 text-primary mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
              </svg>
              <span class="text-sm font-medium text-text-dark">Alimentation</span>
            </button>
          </div>
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
      --accent-green: #82b864;
    }

    /* Classes utilitaires */
    .bg-primary-light { background-color: var(--primary-light); }
    .bg-primary { background-color: var(--primary); }
    .bg-accent-green { background-color: var(--accent-green); }
    .text-primary { color: var(--primary); }
    .text-text-dark { color: var(--text-dark); }
    .hover\\:bg-primary-dark:hover { background-color: var(--primary-dark); }
    .hover\\:bg-green-600:hover { background-color: #059669; }
    .hover\\:bg-primary-light:hover { background-color: var(--primary-light); }
    .hover\\:border-primary:hover { border-color: var(--primary); }

    /* Interactions tactiles */
    .touch-manipulation {
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
    }

    /* Animation d'entrée */
    :host {
      animation: fadeInUp 0.6s ease-out;
    }

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

    /* États tactiles mobiles */
    button:active {
      transform: scale(0.98);
    }

    /* Hover effects pour desktop */
    @media (min-width: 768px) {
      button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 116, 199, 0.2);
      }
      
      button:hover svg {
        transform: scale(1.1);
      }
    }

    /* Responsive font sizes */
    @media (max-width: 480px) {
      h1 {
        font-size: 4rem !important;
      }
    }

    /* Accessibilité */
    button:focus {
      outline: 2px solid var(--primary);
      outline-offset: 2px;
    }

    /* Performance */
    * {
      transition-property: color, background-color, border-color, opacity, transform;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 200ms;
    }

    /* Réduction de mouvement */
    @media (prefers-reduced-motion: reduce) {
      * {
        animation: none !important;
        transition: none !important;
      }
    }
  `]
})
export class Page404Component implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Component initialized
  }

  /**
   * Redirection vers la page d'accueil
   */
  goHome(): void {
    this.router.navigate(['/home']);
  }

  /**
   * Redirection vers la liste de tous les artisans
   */
  goToArtisans(): void {
    this.router.navigate(['/artisans']);
  }

  /**
   * Redirection vers une catégorie spécifique
   */
  goToCategory(category: string): void {
    this.router.navigate([`/${category}`]);
  }
}