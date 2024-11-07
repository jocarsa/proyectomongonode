import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { DameproductosService } from '../dameproductos.service';
import { EnviarDatosService } from '../enviardatos.service';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule], // Agrega FormsModule aquí
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  jsonData: any;
  nombre: string = '';
  apellidos: string = '';

  constructor(
    private dameproductosService: DameproductosService,
    private enviarDatosService: EnviarDatosService
  ) {}

  ngOnInit(): void {
    this.dameDatos();
  }

  dameDatos() {
    this.dameproductosService.dameDatos().subscribe(datos => {
      this.jsonData = datos;
    });
  }

  enviarCliente() {
    if (this.nombre && this.apellidos) {
      this.enviarDatosService.enviarCliente(this.nombre, this.apellidos).subscribe(
        response => {
          console.log('Cliente insertado con éxito:', response);
          this.nombre = '';
          this.apellidos = '';
        },
        error => {
          console.error('Error al insertar cliente:', error);
        }
      );
    } else {
      console.warn('Nombre y apellidos son requeridos');
    }
  }
}
