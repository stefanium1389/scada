import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalInputListComponent } from './digital-input-list.component';

describe('DigitalInputListComponent', () => {
  let component: DigitalInputListComponent;
  let fixture: ComponentFixture<DigitalInputListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalInputListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigitalInputListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
