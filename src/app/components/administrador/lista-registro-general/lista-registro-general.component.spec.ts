import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListaRegistroGeneralComponent } from './lista-registro-general.component';

describe('ListaRegistroGeneralComponent', () => {
  let component: ListaRegistroGeneralComponent;
  let fixture: ComponentFixture<ListaRegistroGeneralComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ListaRegistroGeneralComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaRegistroGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
