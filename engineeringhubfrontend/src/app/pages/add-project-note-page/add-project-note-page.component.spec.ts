import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectNotePageComponent } from './add-project-note-page.component';

describe('AddProjectNotePageComponent', () => {
  let component: AddProjectNotePageComponent;
  let fixture: ComponentFixture<AddProjectNotePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProjectNotePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectNotePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
