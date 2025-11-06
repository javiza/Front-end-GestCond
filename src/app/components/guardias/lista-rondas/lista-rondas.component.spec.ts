import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListaRondasComponent } from './lista-rondas.component';

describe('ListaRondasComponent', () => {
  let component: ListaRondasComponent;
  let fixture: ComponentFixture<ListaRondasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ListaRondasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaRondasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
