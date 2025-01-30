import {Component, inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthActions} from './features/auth/store/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'unleashed-frontend-yms';
  isLoading: boolean = false;
  store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(AuthActions.hydrateAuthState());
  }
}
