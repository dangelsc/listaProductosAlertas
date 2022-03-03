import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/service/producto.service';
import { environment } from 'src/environments/environment';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  lista: Producto[] = [];
  cantidadMinimaProd: number = environment.cantidadMinimaProd;
  fechaMinimaSemana: number = environment.fechaMinimaSemana; //14 dias
  constructor(
    private prodServicio: ProductoService,
    @Inject(DOCUMENT) document: Document
  ) {}

  verificaFechaVencidaVal(item: Producto): number {
    if (item.fechaVencimiento) {
      let fechaProd = new Date(item.fechaVencimiento.toDateString());
      let hoy = new Date();
      fechaProd.setDate(
        item.fechaVencimiento.getDate() - this.fechaMinimaSemana * 7
      );
      if (fechaProd > hoy) return 0;
      else if (item.fechaVencimiento < hoy) return 2;
      else return 1;
    }
    return 0;
  }
  verificaFechaVencidaMessage(item: Producto): string {
    const vale: number = this.verificaFechaVencidaVal(item);
    return vale == 0
      ? ''
      : vale == 1
      ? 'Pronto a vencer'
      : 'Ya se vencio el producto';
  }
  verificaFechaVencida(item: Producto): string {
    const vale: number = this.verificaFechaVencidaVal(item);
    return vale == 0 ? 'white' : vale == 1 ? 'orange' : 'red';
  }

  ngOnInit(): void {
    this.prodServicio.getAll().subscribe((datos) => {
      //console.log('ini', datos[0].fechaVencimiento.toDate());
      datos.map((a: any) => {
        a.fechaVencimiento = a.fechaVencimiento.toDate();
        return a;
      });
      this.lista = datos;
      console.log('conver', datos);
    });
  }
  async nuevoProd() {
    const { value: formValues } = await Swal.fire({
      title: 'Multiple inputs',
      html: `<label for="">Nombre</label>
        <input required id="nombre" class="form-control" placeholder="Nombre" >
        <label for="">Categoria</label>
        <input required id="categoria" class="form-control" placeholder="Categoria" >
        <label for="">Cantidad</label>
        <input required id="cantidad" type="number" class="form-control" placeholder="Cantidad" >
        <label for="">Precio</label>
        <input required id="precio" type="number" class="form-control" placeholder="precio" >
        <label for="">Fecha Vencimiento</label>
        <input required id="fechaVencimiento" type="date" class="form-control" placeholder="fechaVencimiento" >
        `,
      focusConfirm: false,
      preConfirm: () => {
        //validar

        let t: Producto = {
          nombre: (<HTMLInputElement>document.getElementById('nombre')).value,
          categoria: (<HTMLInputElement>document.getElementById('categoria'))
            .value,
          cantidad: Number(
            (<HTMLInputElement>document.getElementById('cantidad')).value
          ),
          precio: Number(
            (<HTMLInputElement>document.getElementById('precio')).value
          ),
          fechaVencimiento: new Date(
            (<HTMLInputElement>(
              document.getElementById('fechaVencimiento')
            )).value
          ),
        };
        return t;
      },
    });

    if (formValues) {
      this.prodServicio.add(formValues);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto Agregado',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
