import { TestBed } from '@angular/core/testing';

import { EnviardatosService } from './enviardatos.service';

describe('EnviardatosService', () => {
  let service: EnviardatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviardatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
