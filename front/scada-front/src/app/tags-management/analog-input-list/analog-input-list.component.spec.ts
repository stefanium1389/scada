import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalogInputListComponent } from './analog-input-list.component';

describe('AnalogInputListComponent', () => {
  let component: AnalogInputListComponent;
  let fixture: ComponentFixture<AnalogInputListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalogInputListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalogInputListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
