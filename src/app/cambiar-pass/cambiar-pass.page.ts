
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-cambiar-pass',
  templateUrl: './cambiar-pass.page.html',
  styleUrls: ['./cambiar-pass.page.scss'],
})
export class CambiarPassPage {
  nombreUsuario: string = '';
  nuevaContrasena: string = '';
  usuarioValido: boolean = false;
  usuarioNoEncontrado: boolean = false;
  mostrarMensajeNoIngreso: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async verificarUsuario() {
    this.resetMessages();

    if (!this.nombreUsuario.trim()) {
      this.mostrarMensajeNoIngreso = true;
      return;
    }

    try {
      const usuarioGuardado = (await Preferences.get({ key: 'usuario' })).value;
      this.usuarioValido = usuarioGuardado === this.nombreUsuario;
      this.usuarioNoEncontrado = !this.usuarioValido;
    } catch (error) {
      await this.showAlert('Error', 'No se pudo verificar el usuario.');
    }
  }

  async cambiarContrasena() {
    if (!this.nuevaContrasena.trim()) {
      await this.showAlert('Error', 'Debe ingresar una nueva contraseña.');
      return;
    }

    try {
      await Preferences.set({ key: 'contrasena', value: this.nuevaContrasena });
      await this.showAlert('Éxito', 'Contraseña cambiada exitosamente.');
      this.router.navigate(['/home']);
    } catch (error) {
      await this.showAlert('Error', 'No se pudo cambiar la contraseña.');
    }
  }

  private resetMessages() {
    this.usuarioValido = false;
    this.usuarioNoEncontrado = false;
    this.mostrarMensajeNoIngreso = false;
  }

  private async showAlert(header: string, message: string) {
    const alerta = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alerta.present();
  }
}
