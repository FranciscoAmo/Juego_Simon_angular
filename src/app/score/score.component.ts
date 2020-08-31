import { Component, OnInit, Input } from '@angular/core';
import { JuegoComponent } from '../juego/juego.component';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  // valores de entrada de juego.componenet
  @Input() level;
  @Input() clicks;

  // entrada puntos

  entrada: {
    rango: number,
    nombre: string,
    puntos: number
   };

  // score total
  totalScore: number;

 

  constructor( juego: JuegoComponent) { }

  ngOnInit() {
    this.totalScore = 0;
     // listado de Hall OF Fame
  }
  sumarPuntos() {
      return this.totalScore + (this.level * this.clicks);

  }
 
}
