import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpenWeatherPage } from './openweather.page';

describe('OpenweatherPage', () => {
  let component: OpenWeatherPage;
  let fixture: ComponentFixture<OpenWeatherPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenWeatherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
