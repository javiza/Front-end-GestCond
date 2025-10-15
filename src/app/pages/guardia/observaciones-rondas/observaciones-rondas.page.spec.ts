import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObservacionesRondasPage } from './observaciones-rondas.page';

describe('ObservacionesRondasPage', () => {
  let component: ObservacionesRondasPage;
  let fixture: ComponentFixture<ObservacionesRondasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservacionesRondasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
