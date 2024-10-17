import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
    const _router = inject(Router);
    if (!sessionStorage.getItem('login')) {
        const redirectTo = _router.createUrlTree(['/inicio']);
        return redirectTo;
    } else {
        return true;
    }
};
