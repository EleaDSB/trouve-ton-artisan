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
    <footer class="footer-main">
      <div class="container">
        <div class="footer-content">

        <!-- Logo -->
        <div class="logo-section">
              <img 
                src="assets/images/logo.png" 
                alt="Logo Trouve Ton Artisan" 
                class="footer-logo"
                >
          </div>
          
          <!-- Section Adresse -->
          <div class="footer-section">
            <div class="section-title">
              <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <h3 class="text-white font-bold">Adresse</h3>
            </div>
            <div class="section-content">
              <p class="text-white">
                101 cours Charlemagne<br>
                CS 200033<br>
                69269 LYON CEDEX 02<br>
                France<br>
                + 33 (0)4 26 73 40 00
              </p>
            </div>
          </div>

          <!-- Section Pages légales -->
          <div class="footer-section">
            <div class="section-title">
              <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <h3 class="text-white font-bold">Pages légales</h3>
            </div>
            <div class="section-content">
              <div class="legal-links">
                <a routerLink="/mentions-legales" class="legal-link">
                  Mentions Légales
                </a>
                <a routerLink="/donnees-personnelles" class="legal-link">
                  Données personnelles
                </a>
                <a routerLink="/accessibilite" class="legal-link">
                  Accessibilité
                </a>
                <a routerLink="/cookies" class="legal-link">
                  Cookies
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
    
    .footer-main {
      background-color: #00497c;
      margin-top: auto;
      padding: 1.5 rem 0;
      width: 100%;
      position: relative;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }
    
    .footer-content {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 4rem;
      align-items: start;
    }
    
    .footer-section {
      display: flex;
      flex-direction: column;
      gap: 0.5 rem;
    }
    
    .section-title {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      margin-bottom: 0.25rem;
    }
    
    .logo-section {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
      padding: 50px;
    }
    
    .footer-logo {
      height: 10rem;
      width: 18rem;
      object-fit: cover;
      border-radius: 0.75rem;
      border: 3px solid #f1f8fc;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
      background-color: white;
      padding: 0.5rem;
      transition: transform 0.2s ease;
    }
    
    .footer-logo:hover {
      transform: scale(1.05);
    }
    
    .section-icon {
      width: 1.5rem;
      height: 1.5rem;
      color: #f1f8fc;
    }
    
    .section-content {
      padding-left: 0.25rem;
    }
    
    .text-white {
      color: white;
      line-height: 1.8;
    }
    
    .font-bold {
      font-weight: 600;
      font-size: 1.1rem;
    }
    
    p {
      margin: 0;
      font-size: 0.95rem;
    }
    
    .legal-links {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    
    .legal-link {
      color: white;
      text-decoration: none;
      font-size: 0.95rem;
      transition: color 0.2s ease;
      padding: 0.25rem 0;
    }
    
    .legal-link:hover {
      color: #f1f8fc;
      text-decoration: underline;
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }
      
      .container {
        padding: 0 1rem;
      }
      
      .footer-main {
        padding: 2rem 0;
      }
      
      .section-title {
        gap: 0.5rem;
      }
      
      .section-icon {
        width: 1.25rem;
        height: 1.25rem;
      }
      
      .footer-logo {
        height: 6rem;
        width: 7rem;
      }
    }
  `]
})
export class FooterComponent implements OnInit {
  
  ngOnInit(): void {
    console.log('FooterComponent initialized');
  }
}
