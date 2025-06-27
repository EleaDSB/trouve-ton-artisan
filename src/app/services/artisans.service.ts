import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Artisan } from '../models/artisan.model';

@Injectable({
  providedIn: 'root'
})
export class ArtisansService {
  private artisansUrl = 'assets/data/artisans.json';

  constructor(private http: HttpClient) { }

  /**
   * Récupérer tous les artisans depuis le fichier JSON
   */
  getArtisans(): Observable<Artisan[]> {
    return this.http.get<Artisan[]>(this.artisansUrl).pipe(
      catchError(error => {
        console.error('Erreur lors du chargement des artisans:', error);
        return of([]); // Retourner un tableau vide en cas d'erreur
      })
    );
  }

  /**
   * Récupérer un artisan par son ID
   */
  getArtisanById(id: number): Observable<Artisan | undefined> {
    return new Observable(observer => {
      this.getArtisans().subscribe(artisans => {
        const artisan = artisans.find(a => a.id === id);
        observer.next(artisan);
        observer.complete();
      });
    });
  }

  /**
   * Rechercher des artisans par terme de recherche
   */
  searchArtisans(searchTerm: string): Observable<Artisan[]> {
    return new Observable(observer => {
      this.getArtisans().subscribe(artisans => {
        const term = searchTerm.toLowerCase().trim();
        
        if (!term) {
          observer.next(artisans);
        } else {
          const filteredArtisans = artisans.filter(artisan =>
            artisan.nom.toLowerCase().includes(term) ||
            artisan.specialite.toLowerCase().includes(term) ||
            artisan.ville.toLowerCase().includes(term) ||
            (artisan.entreprise && artisan.entreprise.toLowerCase().includes(term))
          );
          observer.next(filteredArtisans);
        }
        observer.complete();
      });
    });
  }

  /**
   * Filtrer les artisans par catégorie
   */
  getArtisansByCategory(category: string): Observable<Artisan[]> {
    return new Observable(observer => {
      this.getArtisans().subscribe(artisans => {
        if (category === 'all') {
          observer.next(artisans);
        } else {
          const filteredArtisans = artisans.filter(artisan => artisan.categorie === category);
          observer.next(filteredArtisans);
        }
        observer.complete();
      });
    });
  }
}
