import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiLastComponent } from './ai-last.component';

describe('AiLastComponent', () => {
  let component: AiLastComponent;
  let fixture: ComponentFixture<AiLastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiLastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiLastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
