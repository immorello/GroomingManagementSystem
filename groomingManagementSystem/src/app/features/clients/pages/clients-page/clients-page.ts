import { Component } from '@angular/core';
import { DogClient } from '../../models/dog-client.model';
import { ClientsService } from '../../services/clients';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-clients-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './clients-page.html',
  styleUrl: './clients-page.css',
  standalone:true
})
export class ClientsPage {

  dogs$: Observable<DogClient[]>;

  constructor(private clients:ClientsService){
    this.dogs$ = clients.getAll();
  }
}
