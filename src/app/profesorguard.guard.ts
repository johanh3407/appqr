import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProfesorGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  async canActivate(): Promise<boolean> {
    const tipoUsuario = await this.authService.obtenerTipoUsuario();
    if (tipoUsuario === 'profesor') {
      return true; 
    } else {
      this.router.navigate(['/home']);
      return false; 
    }
  }
}
