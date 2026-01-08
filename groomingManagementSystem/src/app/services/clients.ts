import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DogClient } from '../models/dog-client.model';
import { DOG_CLIENTS_MOCK } from '../models/mocks/dog-clients.mock';

@Injectable({ providedIn: 'root' })
export class ClientsService {
  private readonly clients = DOG_CLIENTS_MOCK;

  getAll(): Observable<DogClient[]> {
    return of(this.clients);
  }

  getById(id: string): Observable<DogClient | undefined> {
    return of(this.clients.find(c => c.id === id));
  }
}
