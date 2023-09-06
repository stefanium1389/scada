import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalogOutputFormComponent } from './analog-output-form.component';

describe('AnalogOutputFormComponent', () => {
  let component: AnalogOutputFormComponent;
  let fixture: ComponentFixture<AnalogOutputFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalogOutputFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalogOutputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
