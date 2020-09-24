import { TestBed } from '@angular/core/testing';

import { ServicioItemsService } from './servicio-items.service';

describe('ServicioItemsService', () => {
  let service: ServicioItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
