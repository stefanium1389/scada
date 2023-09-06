import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtuComponent } from './rtu.component';

describe('RtuComponent', () => {
  let component: RtuComponent;
  let fixture: ComponentFixture<RtuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RtuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RtuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
