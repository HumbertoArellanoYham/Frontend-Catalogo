import { Component, numberAttribute } from '@angular/core';
import { Producto } from '../../interfaces/producto.interface';
import { TiendaService } from '../../services/tienda.service';
import { Item } from '../../interfaces/item.interface';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent{

  productos: Producto[] = [];

  constructor(private servicioTienda: TiendaService) {
    this.servicioTienda.getAllProducts().subscribe((data) => {
      this.productos = data;
      console.log(data);
    });
  }

  addToCart(producto: Producto) {
    this.servicioTienda.addProduct({
      product: producto,
      quantity: 0
    });
    console.log(this.servicioTienda.myCart$);
  }
}
