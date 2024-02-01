import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from './login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivateGuardService implements CanActivate {

  constructor(private loginService:LoginService,private router:Router,
              private jwtHelpService:JwtHelperService) { }
              canActivate(
                route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot
              ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
                if (this.loginService.isAuthenticated()) {
                  return true;
                } else {
                  if (this.jwtHelpService.isTokenExpired()) {
                    return this.loginService.refreshToken().pipe(
                      map((newToken) => {
                        if (newToken) {
                          this.router.navigate(['/customer'], { queryParams: { returnUrl: state.url } });
                          return false;
                        } else {
                          this.router.navigate(['/customer']);
                          return false;
                        }
                      }),
                    );
                  } else {
                    this.router.navigate(['/login']);
                    return false;
                  }
                }
              }

            }
