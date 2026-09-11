import { Routes } from '@angular/router';
import { Messageboard } from './pages/messageboard/messageboard';
import { Home } from './pages/home/home';
import { canActivateAuthRole } from './guard/auth/auth-guard';
import { Forbidden } from './pages/forbidden/forbidden';
import { inject } from '@angular/core';
import { Roles } from './app.constants';
import { Notfound } from './pages/notfound/notfound';
import { Admin } from './pages/admin/admin';

const roles = new Roles()

export const routes: Routes = [
    {
        path: "",
        component: Home
    },
    {
        path: "forbidden",
        component: Forbidden
    },
    {
        path: "messageboard",
        component: Messageboard,
        canActivate: [canActivateAuthRole],
        data: { role: roles.poster }
    },
    {
        path: "admin",
        component: Admin,
        canActivate: [canActivateAuthRole],
        data: { role: roles.poster }
    },
    {
        path: "**",
        component: Notfound
    }
];
