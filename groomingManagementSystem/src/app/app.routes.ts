import { Routes } from '@angular/router';
import { HomePage } from './features/home/pages/home-page/home-page';
import { ClientsPage } from './features/clients/pages/clients-page/clients-page';
import { ClientsDetails } from './features/clients/components/clients-details/clients-details';
import { TeamPage } from './features/team/pages/team-page/team-page';
import { TeamMemberComponent } from './features/team/components/team-member/team-member';
import { AddTeamMemberPage } from './features/team/pages/add-team-member-page/add-team-member-page';

export const routes: Routes = [
    {path:'',component:HomePage, pathMatch:'full'},
    {path:'clients',component:ClientsPage},
    {path:'clients/:id',component:ClientsDetails},
    {path:'team',component:TeamPage},
    {path:'team/add-new-member',component:AddTeamMemberPage},
    {path:'team/:id',component:TeamMemberComponent}
];
