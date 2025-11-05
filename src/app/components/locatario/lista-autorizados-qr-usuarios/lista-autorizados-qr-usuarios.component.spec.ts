import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListaAutorizadosQrUsuariosComponent } from './lista-autorizados-qr-usuarios.component';

describe('ListaAutorizadosQrUsuariosComponent', () => {
  let component: ListaAutorizadosQrUsuariosComponent;
  let fixture: ComponentFixture<ListaAutorizadosQrUsuariosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ListaAutorizadosQrUsuariosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaAutorizadosQrUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
