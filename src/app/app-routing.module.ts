import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherStatusComponent } from './weather-status/weather-status.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Weather in Masku'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
