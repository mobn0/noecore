import { Routes } from '@angular/router';
import { Messageboard } from './pages/messageboard/messageboard';
import { Home } from './pages/home/home';
import { canActivateAuthRole } from './guard/auth/auth-guard';
import { Forbidden } from './pages/forbidden/forbidden';
import { inject } from '@angular/core';
import { Roles } from './app.constants';
import { Notfound } from './pages/notfound/notfound';
import { Admin } from './pages/admin/admin';
import { AdminOverview } from './components/admin/admin-overview/admin-overview';
import { AdminUsers } from './components/admin/admin-users/admin-users';

const roles = new Roles();

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'forbidden',
    component: Forbidden,
  },
  {
    path: 'messageboard',
    component: Messageboard,
    canActivate: [canActivateAuthRole],
    data: { role: roles.poster },
  },
  {
    path: 'admin',
    component: Admin,
    children: [
      { path: '', component: AdminOverview },
      { path: 'overview', component: AdminOverview },
      { path: 'users', component: AdminUsers },
    ],
    canActivate: [canActivateAuthRole],
    data: { role: roles.admin },
  },
  {
    path: '**',
    component: Notfound,
  },
];
