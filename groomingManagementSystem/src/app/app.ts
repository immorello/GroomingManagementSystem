import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

type NavItem = {
  label: string;
  path: string;
  icon: string;
  exact?: boolean;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('groomingManagementSystem');

  navItems: NavItem[] = [
    { label: 'Homepage', path: '/', icon: 'bi-house', exact: true },
    { label: 'Agenda', path: '/agenda', icon: 'bi-calendar2-week' },
    { label: 'Team', path: '/team', icon: 'bi-people' },
    { label: 'Clients', path: '/clients', icon: 'bi-person-heart' },
  ];
}
