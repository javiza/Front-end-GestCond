import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionLocatariosPage } from './gestion-locatarios.page';

describe('GestionLocatariosPage', () => {
  let component: GestionLocatariosPage;
  let fixture: ComponentFixture<GestionLocatariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionLocatariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
