import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface SlotPayload {
  date: string;
  timeSlot: string;
}

export interface CreateReservaPayload {
  name: string;
  cpf: string;
  slots: SlotPayload[];
}

@Injectable({ providedIn: 'root' })
export class ReservaApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/reservas';

  enviar(payload: CreateReservaPayload): Observable<void> {
    return this.http.post<void>(this.apiUrl, payload);
  }
}
