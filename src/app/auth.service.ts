import { Injectable } from '@angular/core';

interface Usuario {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarios: Usuario[] = []; 
  private usuarioActual: Usuario | null = null;

  constructor() {}

  registrar(username: string, password: string): boolean {

    if (this.usuarios.some(user => user.username === username)) {
      return false; 
    }

    this.usuarios.push({ username, password });
    return true; 
  }

  iniciarSesion(username: string, password: string): boolean {

    const usuarioEncontrado = this.usuarios.find(
      user => user.username === username && user.password === password
    );

    if (usuarioEncontrado) {
      this.usuarioActual = usuarioEncontrado; 
      return true;
    }

    return false; 
  }

  cerrarSesion(): void {
    this.usuarioActual = null;
  }

  estaConectado(): boolean {
    return this.usuarioActual !== null; 
  }

  obtenerUsuarioActual(): Usuario | null {
    return this.usuarioActual; 
  }

  cambiarContrasena(nuevaContrasena: string): boolean {
    if (this.usuarioActual) {
      this.usuarioActual.password = nuevaContrasena; 
      return true;
    }
    return false; 
  }

  obtenerUsuariosRegis(): Usuario[] {
    return this.usuarios; 
  }
}
