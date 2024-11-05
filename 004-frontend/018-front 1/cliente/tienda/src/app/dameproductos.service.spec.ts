import { TestBed } from '@angular/core/testing';

import { DameproductosService } from './dameproductos.service';

describe('DameproductosService', () => {
  let service: DameproductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DameproductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
