import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioQRPage } from './inicio-qr.page';

const routes: Routes = [
  {
    path: '',
    component: InicioQRPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioQrPageRoutingModule {}
