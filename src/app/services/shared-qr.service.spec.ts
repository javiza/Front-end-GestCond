import { TestBed } from '@angular/core/testing';

import { SharedQrService } from './shared-qr.service';

describe('SharedQrService', () => {
  let service: SharedQrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedQrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
