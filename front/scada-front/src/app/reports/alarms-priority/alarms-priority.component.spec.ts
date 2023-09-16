import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmsPriorityComponent } from './alarms-priority.component';

describe('AlarmsPriorityComponent', () => {
  let component: AlarmsPriorityComponent;
  let fixture: ComponentFixture<AlarmsPriorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlarmsPriorityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlarmsPriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
