import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface EmailLogSlot {
  date: string;
  timeSlot: string;
}

export interface EmailLog {
  id: number;
  name: string;
  cpf: string;
  slots: EmailLogSlot[];
  sentAt: string;
}

@Injectable({ providedIn: 'root' })
export class EmailLogApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/reservas/email-logs';

  findAll(): Observable<EmailLog[]> {
    return this.http.get<EmailLog[]>(this.apiUrl);
  }
}
