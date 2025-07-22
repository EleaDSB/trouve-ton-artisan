import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  template: `
    <!-- Footer Mobile-First -->
    <footer class="bg-primary-dark py-8 md:py-12 lg:py-16 mt-auto">
      <div class="px-4 mx-auto max-w-7xl">
        
        <!-- Container 3 colonnes : Logo | Adresse | Informations légales -->
        <div class="footer-grid">

          <!-- Colonne 1 : Logo -->
          <div class="footer-column">
            <div class="mb-4 flex justify-center">
              <img 
                src="assets/images/logo.png" 
                alt="Logo Trouve Ton Artisan" 
                class="h-16 w-20 object-cover rounded-lg bg-white border-2 border-primary-light shadow-lg transition-transform duration-200 touch-manipulation hover:scale-105 p-2"
                (error)="onLogoError($event)">
            </div>
            <p class="text-primary-light text-sm leading-relaxed">
              Trouvez l'artisan parfait près de chez vous en quelques clics
            </p>
          </div>
          
          <!-- Colonne 2 : Adresse -->
          <div class="footer-column">
            <div class="flex items-center space-x-3 mb-4">
              <svg class="w-5 h-5 text-primary-light flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <h3 class="text-white font-semibold text-base">Notre Adresse</h3>
            </div>
            <div class="text-primary-light text-sm leading-relaxed space-y-1">
              <p>101 cours Charlemagne</p>
              <p>CS 200033</p>
              <p>69269 LYON CEDEX 02</p>
              <p>France</p>
              <a href="tel:+33426734000" class="inline-flex items-center mt-3 text-white font-medium hover:text-primary-light transition-colors touch-manipulation">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                +33 (0)4 26 73 40 00
              </a>
            </div>
          </div>

          <!-- Colonne 3 : Informations légales -->
          <div class="footer-column">
            <div class="flex items-center space-x-3 mb-4">
              <svg class="w-5 h-5 text-primary-light flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <h3 class="text-white font-semibold text-base">Informations Légales</h3>
            </div>
            <div class="space-y-2">
              <a routerLink="/mentions-legales" 
                 class="block text-primary-light text-sm hover:text-white transition-colors duration-200 py-1 touch-manipulation">
                Mentions Légales
              </a>
              <a routerLink="/donnees-personnelles" 
                 class="block text-primary-light text-sm hover:text-white transition-colors duration-200 py-1 touch-manipulation">
                Données personnelles
              </a>
              <a routerLink="/accessibilite" 
                 class="block text-primary-light text-sm hover:text-white transition-colors duration-200 py-1 touch-manipulation">
                Accessibilité
              </a>
              <a routerLink="/cookies" 
                 class="block text-primary-light text-sm hover:text-white transition-colors duration-200 py-1 touch-manipulation">
                Cookies
              </a>
            </div>
          </div>
        </div>

        <!-- Ligne de séparation -->
        <div class="border-t border-primary/30 mt-6 pt-12 md:mt-12 md:pt-8">
          <div class="text-center">
            <p class="text-primary-light text-xs md:text-sm">
              © {{ currentYear }} Trouve Ton Artisan - Tous droits réservés
            </p>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    /* Variables CSS Mobile-First */
    :host {
      display: block;
      width: 100%;
      --primary-light: #f1f8fc;
      --primary: #0074c7;
      --primary-dark: #00497c;
      --text-dark: #384050;
    }

    /* Classes utilitaires */
    .bg-primary-dark { background-color: var(--primary-dark); }
    .text-primary-light { color: var(--primary-light); }
    .text-white { color: white; }
    .border-primary { border-color: var(--primary); }
    .hover\\:text-primary-light:hover { color: var(--primary-light); }
    .hover\\:text-white:hover { color: white; }

    /* Interactions tactiles mobile-first */
    .touch-manipulation {
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
    }

    /* Mobile-first animations */
    footer {
      animation: slideInUp 0.6s ease-out;
    }

    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Logo mobile-first */
    img {
      transition: transform 0.2s ease;
      will-change: transform;
    }

    img:active {
      transform: scale(0.95);
    }

    /* Liens mobile-first */
    a {
      text-decoration: none;
      position: relative;
    }

    a:active {
      transform: translateY(1px);
    }

    /* Responsive - Desktop improvements */
    @media (min-width: 768px) {
      img:hover {
        transform: scale(1.05);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
      }

      /* Hover effects pour les liens */
      a:hover {
        text-decoration: none;
      }

      /* Animation des éléments */
      a::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 1px;
        background-color: var(--primary-light);
        transition: width 0.3s ease;
      }

      a:hover::after {
        width: 100%;
      }
    }

    /* Large screens optimizations */
    @media (min-width: 1024px) {
      /* Plus d'espacement sur desktop */
      .space-y-8 > * + * {
        margin-top: 0;
      }

      /* Meilleure organisation */
      footer {
        animation-delay: 0.2s;
      }
    }

    /* Accessibilité */
    a:focus,
    img:focus {
      outline: 2px solid var(--primary-light);
      outline-offset: 2px;
    }

    /* Layout Grid Footer */
    .footer-grid {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .footer-column {
      text-align: center;
    }

    @media (min-width: 768px) {
      .footer-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 3rem;
        align-items: start;
      }
      
      .footer-column {
        text-align: left;
      }
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

    /* Mode sombre */
    @media (prefers-color-scheme: dark) {
      footer {
        background-color: #111827;
      }
      
      .text-primary-light {
        color: #e5e7eb;
      }
      
      .border-primary {
        border-color: #374151;
      }
    }
  `]
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();
  
  ngOnInit(): void {
    // Component initialized
  }

  /**
   * Gestion des erreurs du logo
   */
  onLogoError(event: any): void {
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjMDA3NGM3IiByeD0iOCIvPgo8dGV4dCB4PSIyNCIgeT0iMjgiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iI2YxZjhmYyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VEE8L3RleHQ+Cjwvc3ZnPgo=';
  }
}
