import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { Artisan } from '../models/artisan.model';

@Injectable({
  providedIn: 'root'
})
export class ArtisansService {
  private artisansUrl = 'assets/data/artisans.json';
  private artisansCache$?: Observable<Artisan[]>;

  constructor(private http: HttpClient) { }

  /**
   * Récupérer tous les artisans depuis le fichier JSON avec cache
   */
  getArtisans(): Observable<Artisan[]> {
    if (!this.artisansCache$) {
      this.artisansCache$ = this.http.get<Artisan[]>(this.artisansUrl).pipe(
        shareReplay(1),
        catchError(error => {
          console.error('Erreur lors du chargement des artisans:', error);
          this.artisansCache$ = undefined; // Réinitialiser le cache en cas d'erreur
          return throwError(() => new Error('Impossible de charger les artisans'));
        })
      );
    }
    return this.artisansCache$;
  }

  /**
   * Récupérer un artisan par son ID
   */
  getArtisanById(id: number): Observable<Artisan | undefined> {
    return this.getArtisans().pipe(
      map(artisans => artisans.find(a => a.id === id))
    );
  }

  /**
   * Rechercher des artisans par terme de recherche
   */
  searchArtisans(searchTerm: string): Observable<Artisan[]> {
    return this.getArtisans().pipe(
      map(artisans => {
        const term = searchTerm.toLowerCase().trim();

        if (!term) {
          return artisans;
        }

        return artisans.filter(artisan =>
          artisan.nom.toLowerCase().includes(term) ||
          artisan.specialite.toLowerCase().includes(term) ||
          artisan.ville.toLowerCase().includes(term) ||
          (artisan.entreprise && artisan.entreprise.toLowerCase().includes(term))
        );
      })
    );
  }

  /**
   * Filtrer les artisans par catégorie
   */
  getArtisansByCategory(category: string): Observable<Artisan[]> {
    return this.getArtisans().pipe(
      map(artisans => {
        if (category === 'all') {
          return artisans;
        }
        return artisans.filter(artisan => artisan.categorie === category);
      })
    );
  }

  /**
   * Réinitialiser le cache (utile après une mise à jour des données)
   */
  clearCache(): void {
    this.artisansCache$ = undefined;
  }
}
