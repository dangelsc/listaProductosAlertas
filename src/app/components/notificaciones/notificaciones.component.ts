import { Component, Input, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css'],
})
export class NotificacionesComponent implements OnInit {
  constructor(private prodService: ProductoService) {}
  lista: any = [];
  @Input() tipo: number = 1;
  ngOnInit(): void {
    if (this.tipo == 1)
      this.prodService.getAlert().subscribe((s) => {
        this.lista = s;
      });
    else
      this.prodService.getVencidos().subscribe((s) => {
        this.lista = s;
      });
  }
}
