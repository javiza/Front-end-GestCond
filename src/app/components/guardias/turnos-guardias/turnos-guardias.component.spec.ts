import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TurnosGuardiasComponent } from './turnos-guardias.component';

describe('TurnosGuardiasComponent', () => {
  let component: TurnosGuardiasComponent;
  let fixture: ComponentFixture<TurnosGuardiasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TurnosGuardiasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TurnosGuardiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
