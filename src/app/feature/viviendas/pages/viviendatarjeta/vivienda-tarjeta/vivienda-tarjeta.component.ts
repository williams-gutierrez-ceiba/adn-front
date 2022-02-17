import { Component, Input, OnInit } from '@angular/core';
import { Vivienda } from '../../../shared/model/vivienda';

@Component({
  selector: 'app-vivienda-tarjeta',
  templateUrl: './vivienda-tarjeta.component.html',
})
export class ViviendaTarjetaComponent implements OnInit {

  @Input() vivienda!: Vivienda;

  constructor() { }

  ngOnInit(): void {
  }

}
