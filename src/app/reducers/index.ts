import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as fromAuth from '../features/auth/store/reducers/auth.reducer';


export interface AppState {
  auth: fromAuth.State

}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.reducer
};


export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
