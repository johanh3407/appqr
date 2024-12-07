import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarioActual: any;

  private credencialesProfesor = { correo: 'profesor1', contrasena: 'contrasena1' };
  private credencialesEstudiante = { correo: 'estudiante2', contrasena: 'contrasena2' };

  constructor(
    private router: Router,
    private menuController: MenuController
  ) {}

async iniciarSesion(correo: string, contrasena: string): Promise<boolean> {

  await this.cerrarSesion();

  if (correo === this.credencialesProfesor.correo && contrasena === this.credencialesProfesor.contrasena) {
    this.usuarioActual = { correo, tipo: 'profesor' };
    await Preferences.set({ key: 'sesionActiva', value: 'true' });
    await Preferences.set({ key: 'usuario', value: correo });
    await Preferences.set({ key: 'tipoUsuario', value: 'profesor' }); 
    this.router.navigate(['/profesor']);
    return true;
  }

  if (correo === this.credencialesEstudiante.correo && contrasena === this.credencialesEstudiante.contrasena) {
    this.usuarioActual = { correo, tipo: 'estudiante' };
    await Preferences.set({ key: 'sesionActiva', value: 'true' });
    await Preferences.set({ key: 'usuario', value: correo });
    await Preferences.set({ key: 'tipoUsuario', value: 'estudiante' }); 
    this.router.navigate(['/inicio-qr']);
    return true;
  }

  return false;
}

  

  async obtenerUsuarioActual() {
    const usuario = (await Preferences.get({ key: 'usuario' })).value;
    this.usuarioActual = usuario ? { correo: usuario } : null;
    return this.usuarioActual;
  }

  async cerrarSesion() {
    await Preferences.remove({ key: 'sesionActiva' });
    await Preferences.remove({ key: 'usuario' });
    this.router.navigate(['/home']);
  }

  estaConectado(): boolean {
    return !!this.usuarioActual;
  }

  async obtenerTipoUsuario(): Promise<string | null> {
    const usuario = (await Preferences.get({ key: 'usuario' })).value;
    if (!usuario) return null;
  
    if (usuario === this.credencialesProfesor.correo) {
      return 'profesor';
    }
  
    if (usuario === this.credencialesEstudiante.correo) {
      return 'estudiante';
    }
  
    return null; 
  }
}