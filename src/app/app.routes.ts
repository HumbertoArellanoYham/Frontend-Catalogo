import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ProductoComponent } from './components/producto/producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
    { path: 'inicio', component: MainComponent },
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    { path: 'productos', component: ProductoComponent},
    { path: 'about', component: AboutComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'carrito', component: CarritoComponent}
];
