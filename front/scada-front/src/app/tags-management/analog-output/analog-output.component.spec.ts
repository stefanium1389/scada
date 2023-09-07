import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalogOutputComponent } from './analog-output.component';

describe('AnalogOutputComponent', () => {
  let component: AnalogOutputComponent;
  let fixture: ComponentFixture<AnalogOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalogOutputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalogOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
