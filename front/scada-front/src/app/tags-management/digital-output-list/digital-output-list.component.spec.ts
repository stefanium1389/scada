import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalOutputListComponent } from './digital-output-list.component';

describe('DigitalOutputListComponent', () => {
  let component: DigitalOutputListComponent;
  let fixture: ComponentFixture<DigitalOutputListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalOutputListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigitalOutputListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
