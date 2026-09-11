import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})  
export class AppConstants {
    public API_BASE_URL = "http://localhost:8088";
    public API_BASE_URL_REGEX = /^(http:\/\/localhost:8088)(\/.*)?$/i
    public KEYCLOAK_SERVER_URL = "http://localhost:8080/"
    public KEYCLOAK_REALM = "filestore"
    public KEYCLOAK_CLIENT_ID = "frontend"
}

@Injectable({
    providedIn: "root"
})
export class Roles {
    public poster = "poster"
}