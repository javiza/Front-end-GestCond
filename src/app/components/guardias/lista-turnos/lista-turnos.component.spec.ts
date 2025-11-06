import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListaTurnosComponent } from './lista-turnos.component';

describe('ListaTurnosComponent', () => {
  let component: ListaTurnosComponent;
  let fixture: ComponentFixture<ListaTurnosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ListaTurnosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
