import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseDialogComponent } from './case-dialog.component';

describe('CaseDialogComponent', () => {
  let component: CaseDialogComponent;
  let fixture: ComponentFixture<CaseDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaseDialogComponent]
    });
    fixture = TestBed.createComponent(CaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
