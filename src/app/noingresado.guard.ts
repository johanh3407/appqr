import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';  
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class NoIngresadoGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  async canActivate(): Promise<boolean> {
    const sesionActiva = await Preferences.get({ key: 'sesionActiva' });
    if (sesionActiva.value !== 'true') {
      return true;
    } else {
      const tipoUsuario = (await Preferences.get({ key: 'tipoUsuario' })).value;
      if (tipoUsuario === 'profesor') {
        this.router.navigate(['/profesor']);
      } else if (tipoUsuario === 'estudiante') {
        this.router.navigate(['/inicio-qr']);
      } else {
        await this.authService.cerrarSesion(); 
        this.router.navigate(['/home']);
      }
      return false;
    }
  }
  
  
}
