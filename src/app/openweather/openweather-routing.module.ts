import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenWeatherPage } from './openweather.page';

const routes: Routes = [
  {
    path: '',
    component: OpenWeatherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenweatherPageRoutingModule {}
