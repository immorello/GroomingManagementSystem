import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

import { Team } from '../../services/team';
import { TeamMember } from '../../models/team-member.model';
type Weekday = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

@Component({
  selector: 'app-team-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './team-page.html',
  styleUrl: './team-page.css',
})
export class TeamPage {
  members$: Observable<TeamMember[]>;

  constructor(private team: Team) {
    this.members$ = team.getAll();
  }

  // Calcola ore settimanali da schedule (stringhe "HH:MM")
  weeklyHours(member: TeamMember): number {
    const schedule = member.schedule ?? {};
    const days: Weekday[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

    let totalMinutes = 0;

    for (const day of days) {
      const ranges = (schedule as any)[day] as Array<{ start: string; end: string }> | undefined;
      if (!ranges?.length) continue;

      for (const r of ranges) {
        totalMinutes += this.diffMinutes(r.start, r.end);
      }
    }

    return Math.round((totalMinutes / 60) * 10) / 10; // 1 decimale
  }

  private diffMinutes(start: string, end: string): number {
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    return (eh * 60 + em) - (sh * 60 + sm);
  }

  // Label ruolo in badge
  roleBadgeClass(role: TeamMember['role']): string {
    switch (role) {
      case 'toelettatore': return 'badge-role badge-groomer';
      case 'lavaggio': return 'badge-role badge-wash';
      case 'corsista': return 'badge-role badge-trainee';
      case 'reception': return 'badge-role badge-reception';
      default: return 'badge-role';
    }
  }
}
