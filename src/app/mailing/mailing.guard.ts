import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class MailingGuard implements CanActivate {
	localAuth;

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		this.localAuth = {role:'', realUser: false}
		if(localStorage.getItem('user')) {
			this.localAuth = JSON.parse(localStorage.getItem('user'));
		}


		if (this.localAuth.role === 'manager' && this.localAuth.realUser) {
			return true;
		} else {
			window.location.href = '/';
			return false;
		}


	}
}
