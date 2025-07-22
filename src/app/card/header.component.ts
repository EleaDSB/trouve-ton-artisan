import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ArtisansService } from '../services/artisans.service';

@Component({
  selector: 'app-header',
  standalone: true,
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
          <button (click)="navigateToHome()" class="logo-btn">
            <img 
              src="assets/images/logo.png" 
              alt="Logo Trouve Ton Artisan" 
              class="logo"
              (error)="onLogoError($event)">
          </button>

          <!-- Bouton menu mobile -->
          <button 
            (click)="toggleMobileMenu()"
            class="mobile-menu-btn">
            <span [class.hidden]="isMobileMenuOpen">☰</span>
            <span [class.hidden]="!isMobileMenuOpen">✕</span>
          </button>

          <!-- Barre de recherche -->
          <div class="search-container">
            <div class="search-input-wrapper">
              <input 
                type="text" 
                placeholder="Rechercher un artisan..."
                class="search-input"
                [(ngModel)]="searchTerm"
                (keyup.enter)="performSearch()">
              <button 
                (click)="performSearch()" 
                class="search-btn">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div class="mobile-search">
            <div class="search-input-wrapper">
              <input 
                type="text" 
                placeholder="Rechercher un artisan..."
                class="search-input"
                [(ngModel)]="searchTerm"
                (keyup.enter)="performSearch()">
              <button 
                (click)="performSearch()" 
                class="search-btn">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    .header {
      background-color: #00497c;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 50;
    }

    .nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 0;
    }

    .logo-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
    }

    .logo {
      height: 3rem;
      width: 4rem;
      object-fit: cover;
      border-radius: 0.5rem;
      background-color: white;
      border: 2px solid rgba(255, 255, 255, 0.9);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      padding: 0.25rem;
    }

    .mobile-menu-btn {
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0.5rem;
      display: block;
    }

    .search-container {
      flex: 1;
      max-width: 400px;
      margin: 0 2rem;
      display: none;
    }

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

    .mobile-search {
      padding: 1rem 0 0.5rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      margin-bottom: 0.5rem;
    }

    .mobile-search .search-input {
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .mobile-search .search-input::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }

    .mobile-search .search-input:focus {
      background-color: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.5);
    }

    .mobile-search .search-btn {
      color: white;
    }

    .desktop-nav {
      display: none;
      align-items: center;
      gap: 2rem;
    }

    .nav-link {
      color: white;
      text-decoration: none;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      transition: all 0.2s ease;
    }

    .nav-link:hover {
      background-color: rgba(255, 255, 255, 0.1);
      color: #f1f8fc;
    }

    .nav-link.active {
      color: #f1f8fc;
      font-weight: 600;
      background-color: rgba(255, 255, 255, 0.15);
    }

    .mobile-menu {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
      display: block;
    }

    .mobile-menu.open {
      max-height: 500px;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
    }

    .mobile-nav {
      padding: 1rem 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .mobile-nav-link {
      color: white;
      text-decoration: none;
      font-weight: 500;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      transition: all 0.2s ease;
      display: block;
    }

    .mobile-nav-link:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .mobile-nav-link.active {
      color: #f1f8fc;
      font-weight: 600;
      background-color: rgba(255, 255, 255, 0.15);
    }

    @media (min-width: 768px) {
      .logo {
        height: 4rem;
        width: 5rem;
        padding: 0.375rem;
      }
      
      .mobile-menu-btn {
        display: none;
      }
      
      .search-container {
        display: block;
      }
      
      .desktop-nav {
        display: flex;
      }
      
      .mobile-menu {
        display: none;
      }
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