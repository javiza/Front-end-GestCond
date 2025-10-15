import { TestBed } from '@angular/core/testing';

import { EmpresasContratistasService } from './empresas-contratistas.service';

describe('EmpresasContratistasService', () => {
  let service: EmpresasContratistasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpresasContratistasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
