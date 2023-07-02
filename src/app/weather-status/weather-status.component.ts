import { Component, Input, inject } from '@angular/core';
import { WeatherStatus } from '../weatherstatus';
import { WeatherService } from '../weather.service';
import { Chart } from 'chart.js/auto';
import { FormsModule } from '@angular/forms';
import { timeout, timestamp } from 'rxjs';
declare var ol: any;
@Component({
  selector: 'app-weather-status',
  templateUrl: './weather-status.component.html',
  styleUrls: ['./weather-status.component.sass'],
})
export class WeatherStatusComponent {
  weatherService: WeatherService = inject(WeatherService);
  public chart: any;
  weatherStatus: WeatherStatus = {
    time: [],
    temperature_2m: []
  };
  latitude: number = 0;
  longitude: number = 0;

  map: any;
  
  ngOnInit(): void {
    var mousePositionControl = new ol.control.MousePosition({
      coordinateFormat: ol.coordinate.createStringXY(4),
      projection: 'EPSG:4326',
      // comment the following two lines to have the mouse position
      // be placed within the map.
      //className: 'custom-mouse-position',
      //target: document.getElementById('mouse-position'), 
      undefinedHTML: '&nbsp;'
    });


    this.map = new ol.Map({
      target: 'map',
      controls: ol.control.defaults({
        attributionOptions: {
          collapsible: false
        }
      }).extend([mousePositionControl]),
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([0, 30]),
        zoom: 2
      })
    });
    this.map.on('click',  (args: { coordinate: any; }) => {
    console.log(args.coordinate);
    var lonlat = ol.proj.transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
    console.log(lonlat);
    
    this.longitude = lonlat[0];
    this.latitude = lonlat[1];
    this.createChart(this.latitude, this.longitude);  
    }); 
    
    
  }

  setCenter() {
    var view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([this.longitude, this.latitude]));
    view.setZoom(8);
  }

  createChart(lon: number, lat: number){
  this.weatherService.getHourlyWeather(lon, lat).then(weatherStatus => {
  if (this.chart) {this.chart.destroy()}
  this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: weatherStatus.time, 
	       datasets: [
          {
            label: "Temperature °C",
            data: weatherStatus.temperature_2m,
            backgroundColor: 'blue'
          },
        ]
      },
      options: {
        responsive: true
      }
    });
  });
  }

}



