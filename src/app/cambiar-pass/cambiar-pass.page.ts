import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';

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

  verificarUsuario() {

    this.usuarioValido = false;
    this.usuarioNoEncontrado = false;
    this.mostrarMensajeNoIngreso = false;

    if (!this.nombreUsuario.trim()) {

      this.mostrarMensajeNoIngreso = true;
      return;
    }

    const usuarioRegistrado = this.authService.obtenerUsuariosRegis().find(
      user => user.username === this.nombreUsuario
    );

    if (usuarioRegistrado) {

      this.usuarioValido = true;
    } else {

      this.usuarioNoEncontrado = true;
    }
  }

  async cambiarContrasena() {
    if (!this.nuevaContrasena.trim()) {
      const alerta = await this.alertController.create({
        header: 'Error',
        message: 'Debe ingresar una nueva contraseña.',
        buttons: ['OK'],
      });
      await alerta.present();
      return;
    }


    const usuarioRegistrado = this.authService.obtenerUsuariosRegis().find(
      user => user.username === this.nombreUsuario
    );

    if (usuarioRegistrado) {
      usuarioRegistrado.password = this.nuevaContrasena;
      const alerta = await this.alertController.create({
        header: 'Éxito',
        message: 'Contraseña cambiada exitosamente.',
        buttons: ['OK'],
      });
      await alerta.present();
      this.router.navigate(['/home']);
    }
  }
}
