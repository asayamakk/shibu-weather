import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface OpenWeatherMapResponse {
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {
  }

  OPEN_WEATHER_MAP_API_KEY = 'f626dff2286b1f4a91c006665595d315';

  shibuyaWeather: string;
  shibuyaWeatherIcon: string;
  shibuyaTemp: number;
  shibuyaTempMin: number;
  shibuyaTempMax: number;
  prodMode: boolean;


  ngOnInit(): void {
    // this.prodMode = true;

    const url = this.prodMode ? `https://api.openweathermap.org/data/2.5/weather?q=shibuya&appid=${this.OPEN_WEATHER_MAP_API_KEY}&units=metric` : 'http://localhost:8000';
    this.http.get(url).subscribe((data: OpenWeatherMapResponse) => {
      if (this.prodMode) {
        this.shibuyaWeather = data.weather[0]?.main;
        this.shibuyaWeatherIcon = data.weather[0]?.icon;
        this.shibuyaTemp = data.main.temp;
        this.shibuyaTempMax = data.main.temp_max;
        this.shibuyaTempMin = data.main.temp_min;
      } else {
        this.shibuyaWeather = 'Rain';
        this.shibuyaWeatherIcon = '09d';
        this.shibuyaTemp = 16.2;
        this.shibuyaTempMax = 20;
        this.shibuyaTempMin = 12.6;
      }
    });
  }
}
