import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class IngresadoGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  
  async canActivate(): Promise<boolean> {
    const sesionActiva = await Preferences.get({ key: 'sesionActiva' });
    if (sesionActiva.value === 'true') {
      const tipoUsuario = (await Preferences.get({ key: 'tipoUsuario' })).value;
      if (!tipoUsuario) {
        await this.authService.cerrarSesion();
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
  
  
  }
  

