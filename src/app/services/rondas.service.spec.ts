import { TestBed } from '@angular/core/testing';

import { RondasService } from './rondas.service';

describe('RondasService', () => {
  let service: RondasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RondasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
