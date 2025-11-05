import { TestBed } from '@angular/core/testing';

import { AutorizacionQrService } from './autorizacion-qr.service';

describe('AutorizacionQrService', () => {
  let service: AutorizacionQrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutorizacionQrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
