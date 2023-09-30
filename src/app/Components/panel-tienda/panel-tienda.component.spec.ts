import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelTiendaComponent } from './panel-tienda.component';

describe('PanelTiendaComponent', () => {
  let component: PanelTiendaComponent;
  let fixture: ComponentFixture<PanelTiendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelTiendaComponent]
    });
    fixture = TestBed.createComponent(PanelTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
