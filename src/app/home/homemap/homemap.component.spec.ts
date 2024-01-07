import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomemapComponent } from './homemap.component';

describe('HomemapComponent', () => {
  let component: HomemapComponent;
  let fixture: ComponentFixture<HomemapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomemapComponent]
    });
    fixture = TestBed.createComponent(HomemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
