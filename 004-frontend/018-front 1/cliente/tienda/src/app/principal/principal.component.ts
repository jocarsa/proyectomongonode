import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DameproductosService } from '../dameproductos.service';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [HttpClientModule], // Import HttpClientModule directly here
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  jsonData: any;

  constructor(private dameproductosService: DameproductosService) {}

  ngOnInit(): void {
    this.dameDatos();
  }

  dameDatos() {
    this.dameproductosService.dameDatos().subscribe(datos => {
      this.jsonData = datos;
      console.log(datos);
    });
  }
}
