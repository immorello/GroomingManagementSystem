import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeamMemberPage } from './add-team-member-page';

describe('AddTeamMemberPage', () => {
  let component: AddTeamMemberPage;
  let fixture: ComponentFixture<AddTeamMemberPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTeamMemberPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTeamMemberPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
