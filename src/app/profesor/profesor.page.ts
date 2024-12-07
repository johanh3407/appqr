import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {
  asignaturas: string[] = ['Inglés', 'Arquitectura', 'Programación', 'Calidad de Software'];
  asignaturaSeleccionada: string = '';
  codigoQR: string = '';
  fechaGeneracion: string = '';
  usuarioActual: any = null;

  constructor(
    private router: Router,
    private menuController: MenuController,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.usuarioActual = await this.authService.obtenerUsuarioActual();
    if (!this.usuarioActual || this.usuarioActual.tipo !== 'profesor') {
      this.router.navigate(['/home']);
    }
  }

  ionViewWillEnter() {
    this.menuController.enable(true);
  }

  async generarQR() {
    if (!this.asignaturaSeleccionada) {
      alert('Debes seleccionar una asignatura antes de generar el QR.');
      return;
    }

    const fechaActual = new Date();
    this.fechaGeneracion = `${fechaActual.getDate()}/${fechaActual.getMonth() + 1}/${fechaActual.getFullYear()}`;

    const enlaceFijo = 'https://www.duoc.cl/alumnos/ava-blackboard/';
    const enlaceCompleto = `${enlaceFijo}${this.asignaturaSeleccionada.toLowerCase().replace(/ /g, '-')}`;

    try {
      this.codigoQR = await QRCode.toDataURL(enlaceCompleto);
    } catch (err) {
      console.error('Error generando el QR:', err);
    }
  }

  async cerrarSesion() {
    await this.authService.cerrarSesion();
  }
}
