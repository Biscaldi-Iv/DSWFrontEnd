import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductoService } from './producto.service';

describe('ProductoService', () => {
  let service: ProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoService);
    imports: [HttpClientTestingModule]
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
