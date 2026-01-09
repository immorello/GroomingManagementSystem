import { Injectable } from '@angular/core';
import { TEAM_MEMBERS_MOCK } from '../mocks/team-member.mock';
import { TeamMember } from '../models/team-member.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Team {
  private readonly teamMembers = TEAM_MEMBERS_MOCK;
  
    getAll(): Observable<TeamMember[]> {
      return of(this.teamMembers);
    }
  
    getById(id: string | null): Observable<TeamMember | undefined> {
      return of(this.teamMembers.find(c => c.id === id));
    }

    getAvailableAssignees(dateIso: string): Observable<TeamAssignee[]> {
      const date = new Date(dateIso);
      const weekday = this.toWeekday(date);
      const isAvailableOnDate = (member: TeamMember): boolean => {
        if (!member.isActive) {
          return false;
        }

        const daySchedule = member.schedule[weekday];
        if (!daySchedule || daySchedule.length === 0) {
          return false;
        }

        if (!member.timeOff || member.timeOff.length === 0) {
          return true;
        }

        const dateOnly = date.toISOString().slice(0, 10);
        return !member.timeOff.some((timeOff) => {
          return dateOnly >= timeOff.start && dateOnly <= timeOff.end;
        });
      };

      const assignees = this.teamMembers
        .filter(isAvailableOnDate)
        .map((member) => ({
          id: member.id,
          label: `${member.firstName} ${member.lastName}`,
        }));

      return of(assignees);
    }

    private toWeekday(date: Date): keyof TeamMember['schedule'] {
      const days: Array<keyof TeamMember['schedule']> = [
        'sun',
        'mon',
        'tue',
        'wed',
        'thu',
        'fri',
        'sat',
      ];
      return days[date.getDay()];
    }
}

export interface TeamAssignee {
  id: string;
  label: string;
}
