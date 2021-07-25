import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectProposalPageComponent } from './project-proposal-page.component';

describe('ProjectProposalPageComponent', () => {
  let component: ProjectProposalPageComponent;
  let fixture: ComponentFixture<ProjectProposalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectProposalPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectProposalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
