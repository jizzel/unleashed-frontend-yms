import {Component, inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthActions} from '../../store/actions/auth.actions';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  // private store: Store = inject(Store);
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(
      AuthActions.loginRequest({
        credentials: {email: 'jizzeljee@gmail.com', password: '1e7xjr8i'}
      })
    );
  }
}
