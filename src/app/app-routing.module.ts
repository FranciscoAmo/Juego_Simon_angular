import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FondoComponent } from './fondo/fondo.component';
import { ScoreComponent } from './score/score.component';
import { JuegoComponent } from './juego/juego.component';



const routes: Routes = [
  {path:'fondo',component:FondoComponent},
  {path:'Score',component:ScoreComponent},
  {path:'juego',component:JuegoComponent},
  {path:'**',component:FondoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
