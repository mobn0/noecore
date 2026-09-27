import { Component, inject } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import Keycloak from 'keycloak-js';


@Component({
  imports: [MatButtonModule],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  protected keycloak = inject(Keycloak)
  login (){
    this.keycloak.login()
  }
}
