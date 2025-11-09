import { TestBed } from '@angular/core/testing';

import { RegistroVisitasService } from './registro-visitas.service';

describe('RegistroVisitasService', () => {
  let service: RegistroVisitasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroVisitasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
