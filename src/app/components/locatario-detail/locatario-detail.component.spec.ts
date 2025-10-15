import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LocatarioDetailComponent } from './locatario-detail.component';

describe('LocatarioDetailComponent', () => {
  let component: LocatarioDetailComponent;
  let fixture: ComponentFixture<LocatarioDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LocatarioDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LocatarioDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
