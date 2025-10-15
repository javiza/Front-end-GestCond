import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LocatarioFormComponent } from './locatario-form.component';

describe('LocatarioFormComponent', () => {
  let component: LocatarioFormComponent;
  let fixture: ComponentFixture<LocatarioFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LocatarioFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LocatarioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
