import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegistroVisitasComponent } from './registro-visitas.component';

describe('RegistroVisitasComponent', () => {
  let component: RegistroVisitasComponent;
  let fixture: ComponentFixture<RegistroVisitasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RegistroVisitasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroVisitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
