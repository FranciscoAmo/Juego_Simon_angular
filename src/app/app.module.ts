import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { JuegoComponent } from './juego/juego.component';
import { ScoreComponent } from './score/score.component';
import { FondoComponent } from './fondo/fondo.component';

@NgModule({
  declarations: [
    AppComponent,
    JuegoComponent,
    ScoreComponent,
    FondoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
