import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-openweather',
  templateUrl: './openweather.page.html',
  styleUrls: ['./openweather.page.scss'],
})
export class OpenWeatherPage {
  cityName: string = '';
  weatherData: any = null;
  private apiKey: string = 'ccbbb84a2ff150c1caa90866a3932b74';
  private apiUrl: string = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeather() {
    if (!this.cityName) {
      alert('Por favor, ingresa el nombre de una ciudad');
      return;
    }

    const url = `${this.apiUrl}?q=${this.cityName}&appid=${this.apiKey}&units=metric&lang=es`;

    this.http.get(url).subscribe({
      next: (data) => {
        this.weatherData = data;
      },
      error: (err) => {
        console.error('Error fetching weather data', err);
        alert('No se pudo obtener el clima. Verifica el nombre de la ciudad.');
      },
    });
  }
}
