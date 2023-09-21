import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalOutputComponent } from './digital-output.component';

describe('DigitalOutputComponent', () => {
  let component: DigitalOutputComponent;
  let fixture: ComponentFixture<DigitalOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalOutputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigitalOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
