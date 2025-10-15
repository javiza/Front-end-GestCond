import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CasasFormComponent } from './casas-form.component';

describe('CasasFormComponent', () => {
  let component: CasasFormComponent;
  let fixture: ComponentFixture<CasasFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CasasFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CasasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
