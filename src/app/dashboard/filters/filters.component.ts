import { Component, OnInit } from '@angular/core';

const events: Array<Object> = [
  {
    name: 'Music',
    color: 'red',
    icon: 'music'
  }, {
    name: 'Schools',
    color: 'orange',
    icon: 'graduation'
  }, {
    name: 'Games',
    color: 'yellow',
    icon: 'gamepad'
  }, {
    name: 'Birthdays',
    color: 'olive',
    icon: 'birthday cake'
  }, {
    name: 'Bicycle',
    color: 'green',
    icon: 'bicycle'
  }, {
    name: 'Map',
    color: 'teal',
    icon: 'map signs'
  }, {
    name: 'Futball',
    color: 'blue',
    icon: 'futbol'
  }, {
    name: 'Races',
    color: 'violet',
    icon: 'flag checkered'
  }, {
    name: 'Cakes',
    color: 'purple',
    icon: 'cake'
  }
];

const cities: Array<Object> = [
  {
    name: 'Warsaw'
  }, {
    name: 'Wroclaw'
  }, {
    name: 'Cracow'
  }, {
    name: 'Gdansk'
  }, {
    name: 'Poznan'
  }, {
    name: 'Bialystok'
  }, {
    name: 'Siedlce'
  }, {
    name: 'London'
  }
];

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  events: Array<Object> = events;
  cities: Array<Object> = cities;

  constructor() {
  }

  ngOnInit() {
  }

}
