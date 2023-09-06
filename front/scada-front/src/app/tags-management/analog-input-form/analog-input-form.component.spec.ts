import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalogInputFormComponent } from './analog-input-form.component';

describe('AnalogInputFormComponent', () => {
  let component: AnalogInputFormComponent;
  let fixture: ComponentFixture<AnalogInputFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalogInputFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalogInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
