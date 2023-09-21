import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagIdComponent } from './tag-id.component';

describe('TagIdComponent', () => {
  let component: TagIdComponent;
  let fixture: ComponentFixture<TagIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
