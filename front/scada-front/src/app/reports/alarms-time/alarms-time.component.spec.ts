import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmsTimeComponent } from './alarms-time.component';

describe('AlarmsTimeComponent', () => {
  let component: AlarmsTimeComponent;
  let fixture: ComponentFixture<AlarmsTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlarmsTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlarmsTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
