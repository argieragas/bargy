import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCaseDialogComponent } from './new-case-dialog.component';

describe('NewCaseDialogComponent', () => {
  let component: NewCaseDialogComponent;
  let fixture: ComponentFixture<NewCaseDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewCaseDialogComponent]
    });
    fixture = TestBed.createComponent(NewCaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
