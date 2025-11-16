import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeliveryAlertasComponent } from './delivery-alertas.component';

describe('DeliveryAlertasComponent', () => {
  let component: DeliveryAlertasComponent;
  let fixture: ComponentFixture<DeliveryAlertasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DeliveryAlertasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeliveryAlertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
