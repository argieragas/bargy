
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationClient } from './authentication.client';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { Login, Register } from 'src/utils/data';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private tokenKey = 'token';

  constructor(
    private authenticationClient: AuthenticationClient,
    private router: Router
  ) {}

  public login(data: Login, dialog: any): void {
    this.authenticationClient.login(data).subscribe(
      (token) => {
        localStorage.setItem(this.tokenKey, token);
        this.router.navigate(['/user']);
        dialog.close()
      },
      (error) => {
        this.showAlert('warning', error.statusText,'The password you entered is incorrect')
      }
    );
  }

  private showAlert(icon: SweetAlertOptions['icon'], title?: string, text?: string): void {
    Swal.fire({
      icon,
      title,
      text,
    });
  }

  public register(data: Register, dialog: any): void {
    this.authenticationClient
      .register(data)
      .subscribe((token) => {
        localStorage.setItem(this.tokenKey, token);
        this.router.navigate(['/user']);
        dialog.close()
      });
  }

  public logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/']);
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }
}
