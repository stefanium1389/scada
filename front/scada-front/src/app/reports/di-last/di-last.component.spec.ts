import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiLastComponent } from './di-last.component';

describe('DiLastComponent', () => {
  let component: DiLastComponent;
  let fixture: ComponentFixture<DiLastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiLastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiLastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
