import { Component, OnInit, Input} from '@angular/core';




@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})


export class JuegoComponent implements OnInit {
  // flags para cambio css cuando se ejecuta el sonido
  verde: boolean;
  rojo: boolean;
  azul: boolean;
  amarillo: boolean;

  // variable para la secuencia de sonidos
  valor: number;
  // intentos
  trys: number;
  // nivel
  level: number;
  // flag the boton de reintentos
  freintentos: boolean;
  // secuencia
  secuency = [];
  // fallo
  fail = false;
  // flag  de probar introducir la secuencia

  probar = false;
  // contador de los click de la comprobacion
  clicks = 0;
  // flag fin de secuencia
  fsecuencia = true;

  // total de puntos
 totalScore = 0;
 // flag para mostrar texto fin de juego
  finJuego = false;
// flag de final de secuencia
  finsecuencia = false;
// flag instrucciones
  inicioInstrucciones = false;
  constructor() {}

  ngOnInit() {
    this.totalScore = 0;
    // nivel inicio
    this.level = 1;
    // creamos el patron de la secuencia
    this.crearPatron(this.level);
    // numero de intentos de inicio
    this.trys = 3;
    // activamos boton de reintentos
    this.freintentos = true;
    // activar instrucciones
    this.iniciarInstrucciones();
  }

  crearPatron(level) {
    this.secuency = [];
    // numeros aleatorios de 1 a 4
    for (let i = 0; i < level; i++) {
      this.valor = Math.floor(Math.random() * 4 + 1);
      this.secuency.push(this.valor);
    }
    console.log(this.secuency);

    return this.secuency;
  }

  // hace que desaparezca y aparezca el boton empezar
  disable() {
    return this.freintentos;
  }

  async comenzar() {
    if (this.trys > 0) {
      // si aun quedan intentos se reporduce y quita un intento al boton
      this.freintentos = false;
      this.reproducirPatron();
      this.trys--;
      // puntos

    } else {
      this.finJuego = true;
      await this.timer(3000);
      this.finJuego = false;
      // si  se acabaron los intentos hace desaparecere el boton comenzar
      this.level = 1;
      this.totalScore = 0;
      this.reiniciar();
      this.freintentos = true;

    }
  }
  // reinicia el boton
  reiniciar() {
    this.trys = 3;
    this.secuency = this.crearPatron(this.level);
    this.probar = false;
  }

  // reproduce el patron con un intervalo de tiempo
  async reproducirPatron() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.secuency.length; i++) {
      this.valor = this.secuency[i];

      this.reproducirSonido(this.valor);
      await this.timer(1200);
    }
    // activamos que se pueda comparar con la secuencia una vez reproducido
    this.probar = true;
    this.finsecuencia = true;
    await this.timer(1200);
    this.finsecuencia = false;
  }

  // temporizador
  timer(ms) {
    return new Promise(res => setTimeout(res, ms));
  }

  // reproduce los sonidos de la secuencia al clickar
  async reproducirSonido(valor) {
    let note;

    switch (valor) {
      case 1:
        // cambia el estilo de la casilla
        this.rojo = true;
        // reproduce el sonido
        note = new Audio('assets/risa1.mp3');
        note.play();
        // espera 1,2 seg para hacer otra cosa
        await this.timer(1200);
        // desactiva el cambio de estilo y vuelve a su forma normal
        this.rojo = false;
        console.log(valor);
        // en caso de estar probando la secuencia se ve si son iguales
        if (this.probar === true) {
          this.sonIguales(valor);
        }
        break;

      case 2:
        this.azul = true;
        note = new Audio('assets/metralleta2.mp3');
        note.play();
        await this.timer(1200);
        this.azul = false;
        console.log(valor);
        if (this.probar === true) {
          this.sonIguales(valor);
        }
        break;

      case 3:
        this.verde = true;
        note = new Audio('assets/correcaminos.mp3');
        note.play();
        await this.timer(1200);
        this.verde = false;
        console.log(valor);
        if (this.probar === true) {
          this.sonIguales(valor);
        }
        break;

      case 4:
        this.amarillo = true;
        note = new Audio('assets/caballito1.mp3');
        note.play();
        await this.timer(1200);
        this.amarillo = false;
        console.log(valor);
        if (this.probar === true) {
          this.sonIguales(valor);
        }
        break;
    }
    return valor;
  }

  async sonIguales(valor) {
    // si coincide el valor
    console.log("el valor es:"+valor);
    if (this.secuency[this.clicks] === valor) {
      this.fail = false;
      console.log('clicks:' + this.clicks);
      console.log(this.secuency.length);
      // sumo puntos si ha acertado
      this.totalScore = this.sumarPuntos();
      // si ademas del valor se ha completado la secuencia
      console.log("puntos:"+this.totalScore);
      if (this.clicks + 1 === this.secuency.length) {
        // muestro el boton empezar
        this.freintentos = true;
        this.level++;
        console.log('level' + this.level);
        this.reiniciar();
        this.totalScore = this.sumarPuntos();
        this.clicks = 0;
        this.reproducirSonidoExito();
        await this.timer(3000);
      } else {
        this.clicks++;
      }

      console.log("fail" + this.fail);
      console.log("probar" + this.probar);
    } else {
      // bandera de error
      this.fail = true;
      this.reproducirSonidoFallo();

      this.probar = false;
      this.freintentos = false;
      console.log("fail+" + this.fail);
      // reinicio la secuencia de prueba
      this.totalScore = this.restarPuntos();
      this.clicks = 0;

      await this.timer(3000);
      this.fail = false;
      this.comenzar();
    }
  }

  reproducirSonidoFallo() {
    let fallo;
    fallo = new Audio("assets/error.mp3");
    fallo.play();
  }

  // sumar puntos

  sumarPuntos() {
    return  this.totalScore + (this.level + this.clicks);


  }
  restarPuntos(){
    return this.totalScore - (2 * this.level);
  }
  reproducirSonidoExito() {
    let exito;
    exito = new Audio("assets/exito.mp3");
    exito.play();
  }
   FinalJuego() {
    return this.finJuego;
  }

   async iniciarInstrucciones(){
    this.inicioInstrucciones = true;
    await this.timer(3000);
    this.inicioInstrucciones = false;
  }
}
