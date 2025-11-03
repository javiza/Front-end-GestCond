import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IngresoCasasComponent } from './ingreso-casas.component';

describe('IngresoCasasComponent', () => {
  let component: IngresoCasasComponent;
  let fixture: ComponentFixture<IngresoCasasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IngresoCasasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IngresoCasasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
