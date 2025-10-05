import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IngresoUsuarioComponent } from './ingreso-usuario.component';

describe('IngresoUsuarioComponent', () => {
  let component: IngresoUsuarioComponent;
  let fixture: ComponentFixture<IngresoUsuarioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IngresoUsuarioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IngresoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
