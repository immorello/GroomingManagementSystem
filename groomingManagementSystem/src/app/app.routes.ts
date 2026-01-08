import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { ClientsPage } from './clients-page/clients-page';

export const routes: Routes = [
    {path:'',component:HomePage, pathMatch:'full'},
    {path:'clients',component:ClientsPage}
];
