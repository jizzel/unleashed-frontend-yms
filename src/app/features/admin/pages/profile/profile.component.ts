import {Component, inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {
  UserRole,
  UsersResponse
} from '../../../../core/models/admin.interface';
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
  store = inject(Store);
  adminUsers$: Observable<UsersResponse | null>;
  displayedColumns = ['name', 'email', 'role'];

  filters = {
    role: UserRole.USER,
    page: 1,
    limit: 10,
    search: ''
  };

  constructor() {
    this.adminUsers$ = this.store.select(selectAdminUsers);
  }

  ngOnInit() {
    this.loadUsers();
  }

  registerAdmin(data: { firstName: string; email: string }) {
    this.store.dispatch(AdminActions.registerAdmin(data));
  }

  updateRole(userId: string, role: UserRole) {
    this.store.dispatch(AdminActions.updateAdminRole({ userId, role }));
  }

  loadUsers(){
    this.store.dispatch(AdminActions.loadAdminUsers({...this.filters}));
  }

  onPageChange($event: any) {
    this.filters.page = $event.pageIndex + 1;
    this.filters.limit = $event.pageSize;
    this.loadUsers();

  }
}
