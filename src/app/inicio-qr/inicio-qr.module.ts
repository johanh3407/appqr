import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioQrPageRoutingModule } from './inicio-qr-routing.module';

import { InicioQRPage } from './inicio-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioQrPageRoutingModule
  ],
  declarations: [InicioQRPage]
})
export class InicioQrPageModule {}
