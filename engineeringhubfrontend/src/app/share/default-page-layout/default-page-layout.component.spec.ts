import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultPageLayoutComponent } from './default-page-layout.component';

describe('DefaultPageLayoutComponent', () => {
  let component: DefaultPageLayoutComponent;
  let fixture: ComponentFixture<DefaultPageLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultPageLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
