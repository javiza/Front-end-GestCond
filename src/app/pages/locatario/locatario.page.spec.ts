import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocatarioPage } from './locatario.page';

describe('LocatarioPage', () => {
  let component: LocatarioPage;
  let fixture: ComponentFixture<LocatarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LocatarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
