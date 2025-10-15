import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgramarPage } from './programar.page';

describe('ProgramarPage', () => {
  let component: ProgramarPage;
  let fixture: ComponentFixture<ProgramarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
