import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDetailDialogComponent } from './form-detail-dialog.component';

describe('FormDetailDialogComponent', () => {
  let component: FormDetailDialogComponent;
  let fixture: ComponentFixture<FormDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormDetailDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
