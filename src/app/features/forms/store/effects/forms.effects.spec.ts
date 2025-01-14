import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { FormsEffects } from './forms.effects';

describe('FormsEffects', () => {
  let actions$: Observable<any>;
  let effects: FormsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(FormsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
