import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalInputFormComponent } from './digital-input-form.component';

describe('DigitalInputFormComponent', () => {
  let component: DigitalInputFormComponent;
  let fixture: ComponentFixture<DigitalInputFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalInputFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigitalInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
