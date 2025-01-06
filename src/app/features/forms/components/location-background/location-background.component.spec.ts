import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationBackgroundComponent } from './location-background.component';

describe('LocationBackgroundComponent', () => {
  let component: LocationBackgroundComponent;
  let fixture: ComponentFixture<LocationBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationBackgroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
