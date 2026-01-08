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
  
    getById(id: string): Observable<TeamMember | undefined> {
      return of(this.teamMembers.find(c => c.id === id));
    }
}
