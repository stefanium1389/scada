import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsTimeComponent } from './tags-time.component';

describe('TagsTimeComponent', () => {
  let component: TagsTimeComponent;
  let fixture: ComponentFixture<TagsTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagsTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagsTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
