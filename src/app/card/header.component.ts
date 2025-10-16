import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ArtisansService } from '../services/artisans.service';

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ],
  template: `
    <header class="header">
      <div class="container">
        
        <!-- Navigation principale -->
        <nav class="nav">
          
          <!-- Logo -->
          <button type="button" (click)="navigateToHome()" class="logo-btn" aria-label="Retour à l'accueil">
            <img
              src="assets/images/logo.png"
              alt="Logo Trouve Ton Artisan"
              class="logo"
              (error)="onLogoError($event)">
          </button>

          <!-- Bouton menu mobile -->
          <button
            type="button"
            (click)="toggleMobileMenu()"
            class="mobile-menu-btn"
            [attr.aria-label]="isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
            [attr.aria-expanded]="isMobileMenuOpen">
            <span [class.hidden]="isMobileMenuOpen">☰</span>
            <span [class.hidden]="!isMobileMenuOpen">✕</span>
          </button>

          <!-- Barre de recherche -->
          <div class="search-container" role="search">
            <div class="search-input-wrapper">
              <input
                type="search"
                placeholder="Rechercher un artisan..."
                class="search-input"
                [(ngModel)]="searchTerm"
                (keyup.enter)="performSearch()"
                aria-label="Rechercher un artisan par nom, spécialité ou ville"
                id="search-desktop">
              <button
                type="button"
                (click)="performSearch()"
                class="search-btn"
                aria-label="Lancer la recherche">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Navigation Desktop -->
          <div class="desktop-nav">
            <a 
              routerLink="/batiments"
              routerLinkActive="active"
              class="nav-link">
              Bâtiments
            </a>
            <a 
              routerLink="/services"
              routerLinkActive="active"
              class="nav-link">
              Services
            </a>
            <a 
              routerLink="/fabrication"
              routerLinkActive="active"
              class="nav-link">
              Fabrication
            </a>
            <a 
              routerLink="/alimentation"
              routerLinkActive="active"
              class="nav-link">
              Alimentation
            </a>
          </div>
        </nav>

        <!-- Menu mobile -->
        <div class="mobile-menu" [class.open]="isMobileMenuOpen">
          <!-- Recherche mobile -->
          <div class="mobile-search" role="search">
            <div class="search-input-wrapper">
              <input
                type="search"
                placeholder="Rechercher un artisan..."
                class="search-input"
                [(ngModel)]="searchTerm"
                (keyup.enter)="performSearch()"
                aria-label="Rechercher un artisan par nom, spécialité ou ville"
                id="search-mobile">
              <button
                type="button"
                (click)="performSearch()"
                class="search-btn"
                aria-label="Lancer la recherche">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Navigation mobile -->
          <div class="mobile-nav">
            <a 
              routerLink="/batiments"
              routerLinkActive="active"
              (click)="closeMobileMenu()"
              class="mobile-nav-link">
              Bâtiments
            </a>
            <a 
              routerLink="/services"
              routerLinkActive="active"
              (click)="closeMobileMenu()"
              class="mobile-nav-link">
              Services
            </a>
            <a 
              routerLink="/fabrication"
              routerLinkActive="active"
              (click)="closeMobileMenu()"
              class="mobile-nav-link">
              Fabrication
            </a>
            <a 
              routerLink="/alimentation"
              routerLinkActive="active"
              (click)="closeMobileMenu()"
              class="mobile-nav-link">
              Alimentation
            </a>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    /* Header et navigation - Mobile First */
    .header{background:#00497c;box-shadow:0 2px 8px rgba(0,0,0,.15);position:sticky;top:0;z-index:1000;width:100%}
    .nav{display:flex;align-items:center;justify-content:space-between;padding:.75rem 1rem;gap:.75rem}

    /* Logo - Mobile First */
    .logo-btn{background:0 0;border:0;cursor:pointer;padding:.25rem;border-radius:.5rem;flex-shrink:0;transition:transform .2s}
    .logo-btn:active{transform:scale(.95)}
    .logo{height:2.5rem;width:auto;max-width:3.5rem;object-fit:contain;border-radius:.375rem;background:#fff;border:2px solid rgba(255,255,255,.9);box-shadow:0 2px 6px rgba(0,0,0,.2);padding:.25rem;display:block}

    /* Bouton Menu Burger - Visible uniquement < 768px */
    .mobile-menu-btn{background:rgba(255,255,255,.1);border:2px solid rgba(255,255,255,.2);color:#fff;font-size:1.5rem;padding:.5rem .75rem;display:flex!important;align-items:center;justify-content:center;border-radius:.5rem;min-width:44px;min-height:44px;flex-shrink:0;cursor:pointer;transition:all .2s}
    .mobile-menu-btn:hover{background:rgba(255,255,255,.15);border-color:rgba(255,255,255,.3)}
    .mobile-menu-btn:active{transform:scale(.95);background:rgba(255,255,255,.2)}
    .hidden{display:none}

    /* Recherche Desktop - Masquée sur mobile */
    .search-container{flex:1;max-width:400px;margin:0 1rem;display:none}
    .search-input-wrapper{position:relative;display:flex;width:100%;align-items:center}
    .search-input{width:100%;padding:.625rem 1rem;padding-right:2.75rem;border:0;border-radius:.5rem;background:rgba(255,255,255,.95);color:#384050;font-size:.9375rem;outline:0;transition:all .2s}
    .search-input:focus{background:#fff;box-shadow:0 0 0 3px rgba(0,116,199,.3)}
    .search-input::placeholder{color:#6b7280}
    .search-btn{position:absolute;right:.25rem;background:0 0;border:0;color:#0074c7;cursor:pointer;padding:.5rem;border-radius:.375rem;min-width:36px;min-height:36px;display:flex;align-items:center;justify-content:center;transition:all .2s}
    .search-btn:hover{background:rgba(0,116,199,.1);color:#00497c}
    .search-btn:active{transform:scale(.95)}

    /* Navigation Desktop - Masquée sur mobile */
    .desktop-nav{display:none;align-items:center;gap:.5rem}
    .nav-link{color:#fff;text-decoration:none;font-weight:500;font-size:.9375rem;padding:.625rem 1rem;border-radius:.5rem;white-space:nowrap;transition:all .2s}
    .nav-link:hover{background:rgba(255,255,255,.1);color:#f1f8fc;transform:translateY(-1px)}
    .nav-link.active{color:#f1f8fc;font-weight:600;background:rgba(255,255,255,.2);box-shadow:0 2px 4px rgba(0,0,0,.1)}

    /* Menu Mobile Burger - Visible uniquement < 768px */
    .mobile-menu{display:block;max-height:0;overflow:hidden;transition:max-height .3s cubic-bezier(.4,0,.2,1);background:rgba(0,0,0,.05)}
    .mobile-menu.open{max-height:600px;border-top:1px solid rgba(255,255,255,.15);box-shadow:inset 0 2px 4px rgba(0,0,0,.1)}

    /* Recherche dans menu burger */
    .mobile-search{padding:1rem 1rem .75rem;border-bottom:1px solid rgba(255,255,255,.15);margin-bottom:.5rem}
    .mobile-search .search-input{background:rgba(255,255,255,.15);color:#fff;border:2px solid rgba(255,255,255,.2);font-size:16px;padding:.75rem 1rem;padding-right:3rem}
    .mobile-search .search-input::placeholder{color:rgba(255,255,255,.75)}
    .mobile-search .search-input:focus{background:rgba(255,255,255,.25);border-color:rgba(255,255,255,.4);box-shadow:0 0 0 3px rgba(255,255,255,.1)}
    .mobile-search .search-btn{color:#fff;right:.5rem}
    .mobile-search .search-btn:hover{background:rgba(255,255,255,.15)}

    /* Navigation dans menu burger */
    .mobile-nav{padding:.75rem 1rem 1rem;display:flex;flex-direction:column;gap:.5rem}
    .mobile-nav-link{color:#fff;text-decoration:none;font-weight:500;font-size:1rem;padding:1rem 1.25rem;border-radius:.5rem;display:flex;align-items:center;background:rgba(255,255,255,.05);border:2px solid transparent;min-height:48px;transition:all .2s}
    .mobile-nav-link:active{transform:scale(.98)}
    .mobile-nav-link:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.1)}
    .mobile-nav-link.active{color:#f1f8fc;font-weight:600;background:rgba(255,255,255,.2);border-color:rgba(255,255,255,.3);box-shadow:0 2px 4px rgba(0,0,0,.1)}

    /* TABLETTE 768px+ : Masquer burger, afficher navigation desktop */
    @media (min-width:768px){
      .nav{padding:1rem 1.5rem}
      .logo{height:3rem;max-width:4rem;padding:.375rem}
      .mobile-menu-btn{display:none!important}
      .search-container{display:block;margin:0 1.5rem}
      .desktop-nav{display:flex;gap:.75rem}
      .mobile-menu{display:none!important}
    }

    /* DESKTOP 1024px+ */
    @media (min-width:1024px){
      .nav{padding:1rem 2rem}
      .logo{height:3.5rem;max-width:4.5rem}
      .search-container{margin:0 2rem;max-width:500px}
      .desktop-nav{gap:1rem}
      .nav-link{padding:.75rem 1.25rem;font-size:1rem}
    }

    /* LARGE DESKTOP 1280px+ */
    @media (min-width:1280px){
      .search-container{max-width:600px}
      .desktop-nav{gap:1.25rem}
    }
  `]
})
export class HeaderComponent implements OnInit {
  isMobileMenuOpen = false;
  searchTerm = '';

  constructor(private router: Router, private artisansService: ArtisansService) {}

  ngOnInit(): void {
    // Component initialized
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
    this.closeMobileMenu();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  performSearch(): void {
    if (this.searchTerm.trim()) {
      // Rediriger vers la page d'artisans avec le terme de recherche
      this.router.navigate(['/artisans'], { 
        queryParams: { search: this.searchTerm.trim() } 
      });
      this.closeMobileMenu();
    }
  }

  onLogoError(event: any): void {
    event.target.style.display = 'none';
  }
}