import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPersonalPage } from './registro-personal.page';

describe('RegistroPersonalPage', () => {
  let component: RegistroPersonalPage;
  let fixture: ComponentFixture<RegistroPersonalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPersonalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
