import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AdminUser, UserRole} from '../../../../core/models/admin.interface';
import {Store} from '@ngrx/store';
import {AdminActions} from '../../store/actions/admin.actions';
import {selectAdminUsers} from '../../store/selectors/admin.selectors';

@Component({
  selector: 'app-profile',
  standalone: false,

  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  adminUsers$: Observable<AdminUser[]>;
  displayedColumns = ['name', 'email', 'role'];

  constructor(private store: Store<any>) {
    this.adminUsers$ = this.store.select(selectAdminUsers);
  }

  ngOnInit() {
    this.store.dispatch(AdminActions.loadAdminUsers());
  }

  registerAdmin(data: { firstName: string; email: string }) {
    this.store.dispatch(AdminActions.registerAdmin(data));
  }

  updateRole(userId: string, role: UserRole) {
    this.store.dispatch(AdminActions.updateAdminRole({ userId, role }));
  }
}
