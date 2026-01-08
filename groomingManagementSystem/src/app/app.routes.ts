import { Routes } from '@angular/router';
import { HomePage } from './features/home/pages/home-page/home-page';
import { ClientsPage } from './features/clients/pages/clients-page/clients-page';
import { ClientsDetails } from './features/clients/components/clients-details/clients-details';

export const routes: Routes = [
    {path:'',component:HomePage, pathMatch:'full'},
    {path:'clients',component:ClientsPage},
    {path:'clients/:id',component:ClientsDetails}
];
