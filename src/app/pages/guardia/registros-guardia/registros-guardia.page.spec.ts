import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrosGuardiaPage } from './registros-guardia.page';

describe('RegistrosGuardiaPage', () => {
  let component: RegistrosGuardiaPage;
  let fixture: ComponentFixture<RegistrosGuardiaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrosGuardiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
