import { inject, Service } from '@angular/core';
import Keycloak from 'keycloak-js'

@Service()
export class Authservice {
    private keycloak = inject(Keycloak)

    has_role(role: string): boolean {
        return this.keycloak.hasRealmRole("ROLE_"+role)
    }

    logged_in(): boolean {
        return this.keycloak.authenticated
    }
}
