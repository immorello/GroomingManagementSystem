import { Component } from '@angular/core';

@Component({
  selector: 'app-clients-page',
  imports: [],
  templateUrl: './clients-page.html',
  styleUrl: './clients-page.css',
  standalone:true
})
export class ClientsPage {
  constructor(){
    console.log("LOADED CLIENTS");
  }
}
