import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalInputComponent } from './digital-input.component';

describe('DigitalInputComponent', () => {
  let component: DigitalInputComponent;
  let fixture: ComponentFixture<DigitalInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigitalInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
