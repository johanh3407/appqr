import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Preferences } from '@capacitor/preferences';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  correo: string = '';
  contrasena: string = '';

  constructor(
    private alertController: AlertController,
    private router: Router,
    private authService: AuthService,
    private menuController: MenuController
  ) {}

  async ngOnInit() {
    const sesionActiva = await Preferences.get({ key: 'sesionActiva' });
    if (sesionActiva.value === 'true') {
      const tipoUsuario = (await Preferences.get({ key: 'tipoUsuario' })).value;
      if (tipoUsuario === 'profesor') {
        this.router.navigate(['/profesor']);
      } else if (tipoUsuario === 'estudiante') {
        this.router.navigate(['/inicio-qr']);
      } else {
        await this.authService.cerrarSesion(); 
      }
    }
  }
  
  
  ionViewWillEnter() {
    this.menuController.enable(true); 
  }
  async validarCampos() {
    if (this.correo.trim() === '' || this.contrasena.trim() === '') {
      const alerta = await this.alertController.create({
        header: 'Campos vacíos',
        message: 'Por favor, completa todos los campos.',
        buttons: ['OK'],
      });
      await alerta.present();
      return;
    }

    const loginExitoso = await this.authService.iniciarSesion(this.correo, this.contrasena);

    if (loginExitoso) {
      this.limpiarCampos();
    } else {
      const alerta = await this.alertController.create({
        header: 'Error',
        message: 'Usuario o contraseña incorrectos.',
        buttons: ['OK'],
      });
      await alerta.present();
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
