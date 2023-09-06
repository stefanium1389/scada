import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalOutputFormComponent } from './digital-output-form.component';

describe('DigitalOutputFormComponent', () => {
  let component: DigitalOutputFormComponent;
  let fixture: ComponentFixture<DigitalOutputFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalOutputFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigitalOutputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
