import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DameproductosService } from '../dameproductos.service';
import { EnviarDatosService } from '../enviardatos.service';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  jsonData: any;
  carrito: any[] = [];
  nombre: string = '';
  apellidos: string = '';
  email: string = '';
  direccion: string = '';
  totalPedido: number = 0;

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

  agregarAlCarrito(producto: any) {
    this.carrito.push(producto);
    this.totalPedido += producto.precio; // Sumar al total
  }

  enviarCliente() {
    if (this.nombre && this.apellidos && this.email && this.direccion) {
      const pedido = {
        cliente: {
          nombre: this.nombre,
          apellidos: this.apellidos,
          email: this.email,
          direccion: this.direccion
        },
        pedido: {
          fecha: new Date().toISOString().split('T')[0],
          numerodepedido: Math.floor(1000000 + Math.random() * 9000000).toString(), // Número de pedido aleatorio
          totlpedido: this.totalPedido
        },
        lineasdepedido: this.carrito
      };

      this.enviarDatosService.enviarPedido(pedido).subscribe(
        response => {
          console.log('Pedido enviado con éxito:', response);
          this.carrito = [];
          this.totalPedido = 0;
          this.nombre = '';
          this.apellidos = '';
          this.email = '';
          this.direccion = '';
        },
        error => {
          console.error('Error al enviar el pedido:', error);
        }
      );
    } else {
      console.warn('Todos los datos del cliente son requeridos');
    }
  }
}
