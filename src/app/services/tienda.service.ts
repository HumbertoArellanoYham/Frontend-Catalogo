import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto } from '../interfaces/producto.interface';
import { Item } from '../interfaces/item.interface';
import { Ordenventa } from '../interfaces/ordenventa.interface';


@Injectable({
  providedIn: 'root'
})
export class TiendaService{

  baseUrl = 'http://springbootapirest-env.eba-ykzqecs3.us-east-1.elasticbeanstalk.com';

  private myList: Item[] = [];

  private myCart = new BehaviorSubject<Item[]>([]);
  myCart$ = this.myCart.asObservable();

  constructor(private httpclient: HttpClient) { }


  getAllProducts(): Observable<Producto[]> {
    const response = this.httpclient.get<Producto[]>(`${this.baseUrl}/api/products/`);
    return response;
  }

  addProduct(producto: Item) {

    // debugger;
    if (this.myList.length === 0) {
      producto.quantity = 1;
      this.myList.push(producto);
      this.myCart.next(this.myList);

    } else {
      const productoMod = this.myList.find((element) => {
        return element.product.idproducto === producto.product.idproducto
      })
      if (productoMod) {
        productoMod.quantity = productoMod.quantity + 1;
        this.myCart.next(this.myList);
      } else {
        producto.quantity = 1;
        this.myList.push(producto);
        this.myCart.next(this.myList);
      }
    }
    alert('¡Producto añadido al carrito!\n'+producto.product.nombre+' $'+producto.product.precio);
  }

  findProductById(id: number) {
    return this.myList.find((element) => {
      return element.product.idproducto === id
    })

  }

  deleteProduct(id: number) {

    this.myList = this.myList.filter((product) => {
      return product.product.idproducto != id
    })
    this.myCart.next(this.myList);


  }
  totalCart() {
    const total = this.myList.reduce(function (acc, product) { return acc + (product.quantity * product.product.precio); }, 0)
    return total
  }

  realizarCompra(ordenVenta: Ordenventa) {
    this.httpclient.post(`${this.baseUrl}/api/sell`, ordenVenta).subscribe((data) => {
      console.log(data);
      this.myList = [];
      this.myCart.next(this.myList);
    })
  }
}
