import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLinkWithHref } from '@angular/router';
import { Login } from '../login/login';
import { Logout } from '../logout/logout';
import { Roles } from '../../app.constants';
import { Authservice } from '../../services/authservice/authservice';

@Component({
  imports: [MatToolbarModule, MatButtonModule, RouterLinkWithHref, Login, Logout],
  selector: 'app-navbar',
  styleUrl: './navbar.scss',
  templateUrl: './navbar.html',
})
export class Navbar {
  protected roles = inject(Roles)
  protected authService = inject(Authservice)

  protected get is_logged_in() {
    return this.authService.logged_in()
  }

  protected get is_poster() {
    return this.authService.has_role(this.roles.poster)
  }
}
