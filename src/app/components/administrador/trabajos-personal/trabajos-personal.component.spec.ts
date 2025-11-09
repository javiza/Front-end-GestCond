import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TrabajosPersonalComponent } from './trabajos-personal.component';

describe('TrabajosPersonalComponent', () => {
  let component: TrabajosPersonalComponent;
  let fixture: ComponentFixture<TrabajosPersonalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TrabajosPersonalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrabajosPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
