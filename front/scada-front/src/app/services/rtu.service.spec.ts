import { TestBed } from '@angular/core/testing';

import { RtuService } from './rtu.service';

describe('RtuService', () => {
  let service: RtuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RtuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
