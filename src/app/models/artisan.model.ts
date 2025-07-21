export interface Artisan {
  id: number;
  nom: string;
  entreprise?: string;
  specialite: string;
  note: number;
  ville: string;
  categorie: 'batiments' | 'services' | 'fabrication' | 'alimentation';
  telephone?: string;
  email?: string;
  siteWeb?: string;
  description?: string;
  aPropos?: string;
}