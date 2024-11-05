import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CabeceraComponent } from './cabecera/cabecera.component';
import { HeroeComponent } from './heroe/heroe.component';
import { PrincipalComponent } from './principal/principal.component';
import { PiedepaginaComponent } from './piedepagina/piedepagina.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CabeceraComponent,
    HeroeComponent,
    PrincipalComponent,
    PiedepaginaComponent
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tienda';
}
