import { Injectable } from '@angular/core';
import { WeatherStatus} from './weatherstatus';
import { __read } from 'tslib';



@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  async getHourlyWeather(lon: number, lat: number): Promise<WeatherStatus> {
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${lon}&longitude=${lat}&hourly=temperature_2m&forecast_days=1&timezone=Europe%2FBerlin`;
    const data = await fetch(url);
    const jsonData = await data.json() 
    let jsonObj = JSON.parse(JSON.stringify(jsonData.hourly));
    return jsonObj as WeatherStatus; 
  } 
  constructor() {}
  
}
