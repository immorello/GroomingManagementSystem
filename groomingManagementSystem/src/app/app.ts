import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterLinkWithHref } from '@angular/router';

type NavItem = {
  label: string;
  path: string;
  icon: string;
  exact?: boolean;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLinkWithHref],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('groomingManagementSystem');

  printSomething(){
    console.log("Opzione va");
  }
}
