import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListaVisitasComponent } from './lista-visitas.component';

describe('ListaVisitasComponent', () => {
  let component: ListaVisitasComponent;
  let fixture: ComponentFixture<ListaVisitasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ListaVisitasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaVisitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
