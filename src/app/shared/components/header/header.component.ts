import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  isLoggedIn = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // TODO: Implement auth service check
    this.checkAuthStatus();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  checkAuthStatus(): void {
    // TODO: Implement actual auth check
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;
  }

  async logout(): Promise<void> {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    await this.router.navigate(['/login']);
  }
}
