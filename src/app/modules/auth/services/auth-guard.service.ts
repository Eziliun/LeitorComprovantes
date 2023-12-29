import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

export const authGuard: CanActivateFn = async (route, state) => {
  const router: Router = inject(Router);

  const token = (await Preferences.get({ key: 'access_token' })).value!;
  
  if (token) {
    if (window.location.href.includes('login')) {
      return true;
    }
    return true;
  }
  return router.createUrlTree(['/login']);
};
