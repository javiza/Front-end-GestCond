import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListaUsuarioLogeadoComponent } from './lista-usuario-logeado.component';

describe('ListaUsuarioLogeadoComponent', () => {
  let component: ListaUsuarioLogeadoComponent;
  let fixture: ComponentFixture<ListaUsuarioLogeadoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ListaUsuarioLogeadoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaUsuarioLogeadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
