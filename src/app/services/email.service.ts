import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactForm {
  nom: string;
  email: string;
  objet: string;
  message: string;
  artisanEmail: string;
  artisanNom?: string;
}

export interface EmailResponse {
  success: boolean;
  message?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = '/api/contact';

  constructor(private http: HttpClient) {}

  /**
   * Envoie un email de contact à un artisan
   */
  sendContactEmail(formData: ContactForm): Observable<EmailResponse> {
    return this.http.post<EmailResponse>(this.apiUrl, formData);
  }
}
