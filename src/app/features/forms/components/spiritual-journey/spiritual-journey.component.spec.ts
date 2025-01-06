import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpiritualJourneyComponent } from './spiritual-journey.component';

describe('SpiritualJourneyComponent', () => {
  let component: SpiritualJourneyComponent;
  let fixture: ComponentFixture<SpiritualJourneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpiritualJourneyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpiritualJourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
