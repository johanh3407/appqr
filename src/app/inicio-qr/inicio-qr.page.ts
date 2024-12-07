import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-inicio-qr',
  templateUrl: './inicio-qr.page.html',
  styleUrls: ['./inicio-qr.page.scss'],
})
export class InicioQRPage implements OnInit {
  qrText: string = ''; 

  constructor(
    private menuController: MenuController,
    private toastController: ToastController,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.menuController.enable(true);
  }

  async scanQR(): Promise<void> {
    try {

      const { camera } = await BarcodeScanner.requestPermissions();
      if (camera !== 'granted') {
        console.error('Permiso de cámara denegado');
        return;
      }


      const { barcodes } = await BarcodeScanner.scan();
      if (barcodes.length > 0) {
        this.qrText = barcodes[0].displayValue || ''; 
        console.log('Datos escaneados:', this.qrText);
        this.presentToast('Código QR escaneado correctamente.');
      } else {
        this.presentToast('No se detectaron códigos.');
      }
    } catch (error) {
      console.error('Error al escanear QR:', error);
      this.presentToast('Error al escanear QR.');
    }
  }

  isLink(text: string): boolean {
    const urlRegex = /^(https?:\/\/)/i;
    return urlRegex.test(text);
  }

  openLink(url: string): void {
    if (this.isLink(url)) {
      window.open(url, '_blank');
    }
  }

  async copyToClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.presentToast('Texto copiado al portapapeles.');
    } catch (error) {
      console.error('Error al copiar texto:', error);
      this.presentToast('Error al copiar el texto.');
    }
  }

  async cerrarSesion() {
    try {
      await this.authService.cerrarSesion();
      console.log('Sesión cerrada con éxito');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }
}
