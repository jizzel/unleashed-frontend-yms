import {Component, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthActions} from '../../../features/auth/store/actions/auth.actions';
import {Store} from '@ngrx/store';
import {selectIsAuthenticated} from '../../../features/auth/store/selectors/auth.selectors';
import {Observable} from 'rxjs';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  isLoggedIn$: Observable<boolean>;
  private store = inject(Store);

  constructor(private router: Router, private authService: AuthService) {
    this.isLoggedIn$ = this.store.select(selectIsAuthenticated);
  }

  ngOnInit(): void {
    // TODO: Implement auth check
    this.isLoggedIn$ = this.store.select(selectIsAuthenticated);
    // this.checkAuthStatus();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  checkAuthStatus(): void {
    // TODO: Implement actual auth check
    // const token = localStorage.getItem('token');
    // this.isLoggedIn$ = !!token;
  }

  async logout(): Promise<void> {
    // localStorage.removeItem('token');
    // this.isLoggedIn = false;
    this.store.dispatch(AuthActions.logoutRequest());
    // await this.router.navigate(['/login']);
  }
}
