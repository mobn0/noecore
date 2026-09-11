import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideKeycloak, AutoRefreshTokenService, UserActivityService, withAutoRefreshToken, createInterceptorCondition, IncludeBearerTokenCondition, INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG, includeBearerTokenInterceptor } from "keycloak-angular"
import { AppConstants } from "./app.constants"
import { routes } from './app.routes';

const appConstants = new AppConstants()

const urlCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
  urlPattern: appConstants.API_BASE_URL_REGEX,
  bearerPrefix: "Bearer"
})

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([includeBearerTokenInterceptor])),
    provideKeycloak({
      config: {
        url: appConstants.KEYCLOAK_SERVER_URL,
        realm: appConstants.KEYCLOAK_REALM,
        clientId: appConstants.KEYCLOAK_CLIENT_ID
      },
      initOptions: {
        onLoad: "check-sso",
        silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`
      },
      features: [
        withAutoRefreshToken({
          onInactivityTimeout: "logout",
          sessionTimeout: 60000
        })
      ],
      providers: [AutoRefreshTokenService, UserActivityService]
    }),
    {provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG, useValue: [urlCondition]}
  ]
};
