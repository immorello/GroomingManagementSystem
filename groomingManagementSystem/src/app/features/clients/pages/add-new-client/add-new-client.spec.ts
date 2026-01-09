import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewClient } from './add-new-client';

describe('AddNewClient', () => {
  let component: AddNewClient;
  let fixture: ComponentFixture<AddNewClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewClient);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
