import { TestBed } from '@angular/core/testing';

import { TokeniterceptorService } from './tokeniterceptor.service';

describe('TokeniterceptorService', () => {
  let service: TokeniterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokeniterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
