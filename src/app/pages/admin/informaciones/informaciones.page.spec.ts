import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformacionesPage } from './informaciones.page';

describe('InformacionesPage', () => {
  let component: InformacionesPage;
  let fixture: ComponentFixture<InformacionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
