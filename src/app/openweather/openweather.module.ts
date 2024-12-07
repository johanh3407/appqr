import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { OpenweatherPageRoutingModule } from './openweather-routing.module';
import { OpenWeatherPage } from './openweather.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    OpenweatherPageRoutingModule
  ],
  declarations: [OpenWeatherPage]
})
export class OpenWeatherPageModule {}
