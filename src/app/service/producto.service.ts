import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
  where,
} from '@angular/fire/firestore';
//import { firestore } from 'firebase/app';
//import Timestamp = firestore.Timestamp;
import { query } from '@firebase/firestore';
//import { addDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private path: string = 'Producto';
  constructor(private db: Firestore) {}
  getAll(): Observable<any> {
    const colle = collection(this.db, this.path);
    return collectionData(colle);
  }
  add(producto: Producto) {
    const ref = collection(this.db, this.path);
    return addDoc(ref, producto);
  }
  getTimeStamp(now: Date) {
    //now;
    return (
      now.getMonth() +
      1 +
      '/' +
      now.getDate() +
      '/' +
      now.getFullYear() +
      ' ' +
      now.getHours() +
      ':' +
      (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()) +
      ':' +
      (now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds())
    );
  }
  toTimestamp(strDate: any) {
    var datum = Date.parse(strDate);
    return datum / 1000;
  }
  getAlert() {
    const colle = collection(this.db, this.path);
    const deDosSemanas = new Date();
    deDosSemanas.setDate(
      deDosSemanas.getDate() + environment.fechaMinimaSemana * 7
    );
    const hoy = new Date();
    const q = query(
      colle,
      where('fechaVencimiento', '<=', deDosSemanas),
      where('fechaVencimiento', '>=', hoy)
    );
    return collectionData(q);
  }
  getVencidos() {
    const colle = collection(this.db, this.path);
    const hoy = new Date();
    //hoy.setDate(hoy.getDate() + environment.fechaMinimaSemana * 7);
    const q = query(colle, where('fechaVencimiento', '<=', hoy));
    return collectionData(q);
  }
}
