import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalogOutputListComponent } from './analog-output-list.component';

describe('AnalogOutputListComponent', () => {
  let component: AnalogOutputListComponent;
  let fixture: ComponentFixture<AnalogOutputListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalogOutputListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalogOutputListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
