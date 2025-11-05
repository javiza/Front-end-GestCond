import { TestBed } from '@angular/core/testing';

import { QrValidacionService } from './qr-validacion.service';

describe('QrValidacionService', () => {
  let service: QrValidacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QrValidacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
