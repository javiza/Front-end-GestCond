import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrosLocatariosPage } from './registros-locatarios.page';

describe('RegistrosLocatariosPage', () => {
  let component: RegistrosLocatariosPage;
  let fixture: ComponentFixture<RegistrosLocatariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrosLocatariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
