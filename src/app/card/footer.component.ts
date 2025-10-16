import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
  ],
  template: `
    <!-- Footer Mobile-First -->
    <footer class="bg-primary-dark py-6 px-4 md:py-10 md:px-6 lg:py-14 mt-auto">
      <div class="container-footer">
        
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
              Trouvez l'artisan parfait près de chez vous en quelques clics.
            </p>
          </div>
          
          <!-- Colonne 2 : Adresse -->
          <div class="footer-column">
            <div class="footer-column-header">
              <svg class="footer-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <h3 class="footer-title">Notre Adresse</h3>
            </div>
            <address class="footer-address">
              <p>101 cours Charlemagne</p>
              <p>CS 200033</p>
              <p>69269 LYON CEDEX 02</p>
              <p>France</p>
              <a href="tel:+33426734000" class="footer-phone" aria-label="Appeler le +33 4 26 73 40 00">
                <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span>+33 (0)4 26 73 40 00</span>
              </a>
            </address>
          </div>

          <!-- Colonne 3 : Informations légales -->
          <div class="footer-column">
            <div class="footer-column-header">
              <svg class="footer-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <h3 class="footer-title">Informations Légales</h3>
            </div>
            <nav class="footer-links" aria-label="Liens légaux">
              <a routerLink="/mentions-legales" class="footer-link">
                Mentions Légales
              </a>
              <a routerLink="/donnees-personnelles" class="footer-link">
                Données personnelles
              </a>
              <a routerLink="/accessibilite" class="footer-link">
                Accessibilité
              </a>
              <a routerLink="/cookies" class="footer-link">
                Cookies
              </a>
            </nav>
          </div>
        </div>

        <!-- Ligne de séparation -->
        <div class="footer-bottom">
          <p class="footer-copyright">
            © {{ currentYear }} Trouve Ton Artisan - Tous droits réservés
          </p>
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

    /* Container footer */
    .container-footer {
      max-width: 1280px;
      margin: 0 auto;
      width: 100%;
    }

    /* Classes utilitaires */
    .bg-primary-dark { background-color: var(--primary-dark); }
    .text-primary-light { color: var(--primary-light); }
    .text-white { color: white; }
    .border-primary { border-color: var(--primary); }
    .hover\\:text-primary-light:hover { color: var(--primary-light); }
    .hover\\:text-white:hover { color: white; }

    /* Grid footer - Mobile first */
    .footer-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2.5rem;
      margin-bottom: 2rem;
    }

    /* Colonne du footer */
    .footer-column {
      text-align: center;
    }

    /* En-tête de colonne */
    .footer-column-header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .footer-icon {
      width: 1.25rem;
      height: 1.25rem;
      color: var(--primary-light);
      flex-shrink: 0;
    }

    .footer-title {
      color: white;
      font-weight: 600;
      font-size: 1rem;
      margin: 0;
    }

    /* Adresse */
    .footer-address {
      color: var(--primary-light);
      font-size: 0.875rem;
      line-height: 1.75;
      font-style: normal;
    }

    .footer-address p {
      margin: 0.25rem 0;
    }

    .footer-phone {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 1rem;
      color: white;
      font-weight: 500;
      font-size: 0.9375rem;
      padding: 0.75rem 1rem;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 0.5rem;
      transition: all 0.2s ease;
      text-decoration: none;
      min-height: 44px;
    }

    .footer-phone:hover {
      background-color: rgba(255, 255, 255, 0.15);
      color: var(--primary-light);
      transform: translateY(-2px);
    }

    .footer-phone:active {
      transform: translateY(0) scale(0.98);
    }

    /* Liens légaux */
    .footer-links {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      align-items: center;
    }

    .footer-link {
      color: var(--primary-light);
      font-size: 0.9375rem;
      text-decoration: none;
      padding: 0.625rem 1rem;
      transition: all 0.2s ease;
      border-radius: 0.375rem;
      display: inline-block;
      min-height: 44px;
      display: flex;
      align-items: center;
    }

    .footer-link:hover {
      color: white;
      background-color: rgba(255, 255, 255, 0.1);
      transform: translateX(4px);
    }

    .footer-link:active {
      transform: translateX(2px) scale(0.98);
    }

    /* Bas du footer */
    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      margin-top: 2rem;
      padding-top: 1.5rem;
      text-align: center;
    }

    .footer-copyright {
      color: var(--primary-light);
      font-size: 0.8125rem;
      margin: 0;
    }

    /* Logo mobile-first */
    img {
      transition: transform 0.2s ease;
      will-change: transform;
    }

    img:active {
      transform: scale(0.95);
    }

    /* Tablette (640px+) */
    @media (min-width: 640px) {
      .footer-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
      }

      .footer-title {
        font-size: 1.0625rem;
      }

      .footer-address {
        font-size: 0.9375rem;
      }

      .footer-link {
        font-size: 1rem;
      }

      .footer-copyright {
        font-size: 0.875rem;
      }
    }

    /* Tablette (768px+) */
    @media (min-width: 768px) {
      .footer-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 2.5rem;
        align-items: start;
      }

      .footer-column {
        text-align: left;
      }

      .footer-column-header {
        justify-content: flex-start;
      }

      .footer-links {
        align-items: flex-start;
      }

      .footer-bottom {
        margin-top: 3rem;
        padding-top: 2rem;
      }

      img:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
      }
    }

    /* Desktop (1024px+) */
    @media (min-width: 1024px) {
      .footer-grid {
        gap: 3rem;
      }

      .footer-icon {
        width: 1.375rem;
        height: 1.375rem;
      }

      .footer-title {
        font-size: 1.125rem;
      }

      .footer-phone {
        padding: 0.875rem 1.25rem;
      }
    }

    /* Large desktop (1280px+) */
    @media (min-width: 1280px) {
      .footer-grid {
        gap: 4rem;
      }
    }

    /* Accessibilité */
    a:focus,
    button:focus,
    img:focus {
      outline: 2px solid var(--primary-light);
      outline-offset: 2px;
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
