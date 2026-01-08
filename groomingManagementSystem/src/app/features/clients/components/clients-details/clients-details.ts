import { Component } from '@angular/core';
import { ClientsService } from '../../services/clients';
import { Observable } from 'rxjs';
import { DogClient } from '../../models/dog-client.model';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-clients-details',
  imports: [CommonModule,RouterLink,AsyncPipe,DatePipe],
  templateUrl: './clients-details.html',
  styleUrl: './clients-details.css',
})
export class ClientsDetails {
  dogId: string;
  $dogDetails: Observable<DogClient | undefined>;

  constructor(clients:ClientsService, router:Router){
    this.dogId = router.url.split('/')[2]
    this.$dogDetails = clients.getById(this.dogId);
  }
}
