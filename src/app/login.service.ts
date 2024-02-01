import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Login } from './login';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, mapTo, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  currentUserName: string = '';

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string | null = null;

  constructor(private http: HttpClient, private jwtHelpService: JwtHelperService,private router:Router) {}

  private refreshInProgress: boolean = false;

  login(login: Login): Observable<any> {
    return this.http.post<any>(
      'https://localhost:7182/Register/login',
      login,
      httpOptions
    ).pipe(
      map((user) => {
        if (user && user.token) {
          this.currentUserName = user.username;
          sessionStorage['currentUser'] = JSON.stringify(user);
        }
        this.refreshTokenI().subscribe(
          (newToken) => console.log('Token refreshed:', newToken),
          (error) => console.error('Token refresh failed:', error)
        );
        return user;
      }),
    );
    
  }
  logOut(): void {
    this.currentUserName = '';
    sessionStorage.removeItem('currentUser');
    this.router.navigateByUrl('/login');
  }
  
  public isAuthenticated(): boolean {
    return !this.jwtHelpService.isTokenExpired();
  }

  private refreshTokenI(): Observable<string | null> {
    if (this.refreshInProgress) {
      
      return this.waitForRefresh();
    }

    this.refreshInProgress = true;

    if (this.jwtHelpService.isTokenExpired()) {
      const userSession = sessionStorage.getItem('currentUser');
      if (!userSession) {
        this.refreshInProgress = false;
        return throwError('User session not found');
      }

      const currentUser = JSON.parse(userSession);

    
      return this.refreshToken().pipe(
        tap(() => this.refreshInProgress = false)
      );
    } else {
      this.refreshInProgress = false;
      return of(null);
    }
  }
  private waitForRefresh(): Observable<string | null> {
    return new Observable((observer) => {
      const intervalId = setInterval(() => {
        if (!this.refreshInProgress) {
          observer.next(null);
          observer.complete();
          clearInterval(intervalId);
        }
      }, 100);
    });
  }

 
  refreshToken(): Observable<string | null> {
    const userSession = sessionStorage.getItem('currentUser');
    if (!userSession) {
      return throwError('User session not found');
    }

    const currentUser = JSON.parse(userSession);
    const refreshTokenRequest = {
      RefreshToken: currentUser.refreshToken,
    };

    return this.http
      .post<{ token: string }>(
        'https://localhost:7182/Register/refresh-token',
        refreshTokenRequest,
        httpOptions
      )
      .pipe(
        map((response) => {
          if (response && response.token) {
            currentUser.token = response.token;
            sessionStorage['currentUser'] = JSON.stringify(currentUser);
            return response.token;
          }
          return null;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

 


}
