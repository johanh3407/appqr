import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  correo: string = '';
  contrasena: string = '';

  constructor(
    private alertController: AlertController, 
    private router: Router,
    private authService: AuthService 
  ) {}

  async ionViewDidEnter() {
    await this.showWelcomeMessage();
  }

  async showWelcomeMessage() {
    const alerta = await this.alertController.create({
      header: 'Bienvenido',
      message: 'Logeate ',
      buttons: ['OK']
    });
    await alerta.present();
  }

  async validarCampos() {
    if (this.correo.trim() === '' || this.contrasena.trim() === '') {
      const alerta = await this.alertController.create({
        header: 'Campos vacíos',
        message: 'Por favor, completa todos los campos.',
        buttons: ['OK']
      });
      await alerta.present();
    } else {
      if (!this.authService.estaConectado()) {
        this.authService.registrar(this.correo, this.contrasena);
        this.limpiarCampos(); 
        this.router.navigate(['/inicio-qr']);
      } else if (this.authService.iniciarSesion(this.correo, this.contrasena)) {
        this.limpiarCampos(); 
        this.router.navigate(['/inicio-qr']);
      } else {
        const alerta = await this.alertController.create({
          header: 'Error',
          message: 'Usuario o contraseña incorrectos.',
          buttons: ['OK']
        });
        await alerta.present();
      }
    }
  }

  limpiarCampos() {
    this.correo = '';
    this.contrasena = '';
  }

  CambiarPass() {
    this.router.navigate(['/cambiar-pass']);
  }
}
