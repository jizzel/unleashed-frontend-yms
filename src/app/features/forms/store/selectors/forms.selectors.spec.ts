import * as fromForms from '../reducers/forms.reducer';
import { selectFormsState } from './forms.selectors';

describe('Forms Selectors', () => {
  it('should select the feature state', () => {
    const result = selectFormsState({
      [fromForms.formsFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
