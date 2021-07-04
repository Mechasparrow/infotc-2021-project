import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectProposalPageComponent } from './add-project-proposal-page.component';

describe('AddProjectProposalPageComponent', () => {
  let component: AddProjectProposalPageComponent;
  let fixture: ComponentFixture<AddProjectProposalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProjectProposalPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectProposalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
