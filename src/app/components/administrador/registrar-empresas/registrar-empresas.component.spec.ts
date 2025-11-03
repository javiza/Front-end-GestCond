import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegistrarEmpresasComponent } from './registrar-empresas.component';

describe('RegistrarEmpresasComponent', () => {
  let component: RegistrarEmpresasComponent;
  let fixture: ComponentFixture<RegistrarEmpresasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RegistrarEmpresasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
