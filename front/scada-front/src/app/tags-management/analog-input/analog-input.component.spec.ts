import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalogInputComponent } from './analog-input.component';

describe('AnalogInputComponent', () => {
  let component: AnalogInputComponent;
  let fixture: ComponentFixture<AnalogInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalogInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalogInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
