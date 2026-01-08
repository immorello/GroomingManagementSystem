import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Team } from '../../services/team';
import { TeamMember } from '../../models/team-member.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-team-member',
  imports: [CommonModule, RouterLink],
  templateUrl: './team-member.html',
  styleUrl: './team-member.css',
})
export class TeamMemberComponent {
  memberId: string;
  member$: Observable<TeamMember | undefined>;

  constructor(private route: ActivatedRoute, private team: Team) {
    this.memberId = this.route.snapshot.paramMap.get('id') ?? '';
    this.member$ = this.team.getById(this.memberId);
  }
  }
