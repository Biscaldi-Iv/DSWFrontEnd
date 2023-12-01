import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Notificacion2Component } from './notificacion2.component';

describe('Notificacion2Component', () => {
  let component: Notificacion2Component;
  let fixture: ComponentFixture<Notificacion2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Notificacion2Component]
    });
    fixture = TestBed.createComponent(Notificacion2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
