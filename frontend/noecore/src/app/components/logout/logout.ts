import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import Keycloak from "keycloak-js"

@Component({
  imports: [MatButtonModule],
  selector: 'app-logout',
  styleUrl: './logout.scss',
  templateUrl: './logout.html',
})
export class Logout {
  protected keycloak = inject(Keycloak)

  protected logout() {
    this.keycloak.logout()
  }
}
