import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserRole} from './core/models/auth.interface';
import {
  adminMatchGuard,
  authGuard,
  authMatchGuard,
  authRoleGuard,
  noAuthGuard,
  userMatchGuard
} from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'forms', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
    canActivate: [noAuthGuard]
  },
  {
    path: 'forms',
    loadChildren: () => import('./features/forms/forms.module').then(m => m.FormsModule) },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
    // canMatch: [adminMatchGuard],
    canActivate: [authRoleGuard],
    data: {
      roles: [UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER]
    }
  },
  {
    path: 'user',
    loadChildren: () => import('./features/user/user.module').then(m => m.UserModule),
    canMatch: [userMatchGuard],
    // canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'forms' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
