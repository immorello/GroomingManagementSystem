import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMemberComponent } from './team-member';

describe('TeamMember', () => {
  let component: TeamMemberComponent;
  let fixture: ComponentFixture<TeamMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamMemberComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
