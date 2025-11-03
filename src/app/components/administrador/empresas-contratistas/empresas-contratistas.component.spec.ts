import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmpresasContratistasComponent } from './empresas-contratistas.component';

describe('EmpresasContratistasComponent', () => {
  let component: EmpresasContratistasComponent;
  let fixture: ComponentFixture<EmpresasContratistasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EmpresasContratistasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmpresasContratistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
