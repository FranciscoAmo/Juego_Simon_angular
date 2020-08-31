import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fondo',
  templateUrl: './fondo.component.html',
  styleUrls: ['./fondo.component.css']
})
export class FondoComponent implements OnInit {
  audio = new Audio('assets/Entrada.mp3');
  constructor() { }

  ngOnInit() {
    this.reproducir();
  }

  reproducir() {

    this.audio.play();
}
  muteF() {
    if (this.audio.volume !== 0 ) {
      this.audio.volume = 0;
    } else {
      this.audio.volume = 1;
    }
  }
}
