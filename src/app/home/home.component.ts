import { Component,inject } from '@angular/core';
import { WeatherStatus } from '../weatherstatus';
import { WeatherService } from '../weather.service';
import { WeatherStatusComponent } from '../weather-status/weather-status.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {



  constructor() {
 
    }; 
}
 
