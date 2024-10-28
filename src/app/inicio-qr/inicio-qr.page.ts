import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; 
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';

@Component({
  selector: 'app-inicio-qr',
  templateUrl: './inicio-qr.page.html',
  styleUrls: ['./inicio-qr.page.scss'],
})
export class InicioQRPage implements OnInit {
  public menupag = [
    { title: 'Inicio', url: '/inicio-qr', icon: 'home' },
    { title: 'Cerrar sesión', url: '/home', icon: 'log-out' }
  ];
  result: string = ''

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  async qrscan(): Promise<void> {
    
      const result = await CapacitorBarcodeScanner.scanBarcode({
        hint: CapacitorBarcodeScannerTypeHint.ALL
      });
      this.result = result.ScanResult;
    }
}
