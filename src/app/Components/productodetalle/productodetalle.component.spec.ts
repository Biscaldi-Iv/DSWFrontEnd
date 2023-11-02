import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductodetalleComponent } from './productodetalle.component';

describe('ProductodetalleComponent', () => {
  let component: ProductodetalleComponent;
  let fixture: ComponentFixture<ProductodetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductodetalleComponent]
    });
    fixture = TestBed.createComponent(ProductodetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
