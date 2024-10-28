import { Component } from '@angular/core';
import { TiendaService } from '../../services/tienda.service';
import { Item } from '../../interfaces/item.interface';
import { Ordenventa } from '../../interfaces/ordenventa.interface';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {

  myCart$ = this.servicioTienda.myCart$;
  listaCarrito:Item[] = [];

  constructor(private servicioTienda: TiendaService) { 

    this.myCart$.subscribe((data) => {
      this.listaCarrito = data;
    });

  }

  updateUnits(operation: string, id: number) {

    const product = this.servicioTienda.findProductById(id)
    if (product) {
      if (operation === 'minus' && product.quantity > 0) {
        product.quantity = product.quantity - 1;
      }
      if (operation === 'add') {
        product.quantity = product.quantity + 1;

      }
      if (product.quantity === 0) {
        this.deleteProduct(id)
      }
    }

  }
  totalProduct(price: number, units: number) {
    return price * units
  }
  deleteProduct(id: number) {
    this.servicioTienda.deleteProduct(id);

  }
  totalCart() {
    const result = this.servicioTienda.totalCart();
    return result;
  }

  realizarVenta(){
    const date = new Date();
    const ordenVenta: Ordenventa = { sell: {fecha: date, cantidad:this.servicioTienda.totalCart()}, items: this.listaCarrito}
    alert('¡Compra realizada con éxito!\nFecha: '+date+'\nCantidad: $'+this.servicioTienda.totalCart());
    console.log(ordenVenta)
    this.servicioTienda.realizarCompra(ordenVenta);
  }

}