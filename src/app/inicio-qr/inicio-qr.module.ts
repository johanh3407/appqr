import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioQRPageRoutingModule } from './inicio-qr-routing.module';

import { InicioQRPage } from './inicio-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioQRPageRoutingModule
  ],
  declarations: [InicioQRPage]
})
export class InicioQRPageModule {}
