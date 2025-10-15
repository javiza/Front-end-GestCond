import { TestBed } from '@angular/core/testing';

import { LocatariosService } from './locatarios/locatarios.service';

describe('LocatariosService', () => {
  let service: LocatariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocatariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
