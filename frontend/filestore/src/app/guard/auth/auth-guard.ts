import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthGuardData, createAuthGuard } from 'keycloak-angular';
import { Authservice } from '../../services/authservice/authservice';


const isAccessAllowed = async (
  route: ActivatedRouteSnapshot,
  _: RouterStateSnapshot,
  authData : AuthGuardData,
  authService: Authservice = inject(Authservice)
) : Promise<boolean | UrlTree> => {
  const {authenticated, grantedRoles} = authData
  
  const requiredRole = route.data["role"]
  if (!requiredRole){
    return false
  }

  if (authenticated && authService.has_role(requiredRole)){
    return true
  }

  const router = inject(Router)
  return router.parseUrl("/forbidden")
}

export const canActivateAuthRole = createAuthGuard<CanActivateFn>(isAccessAllowed)