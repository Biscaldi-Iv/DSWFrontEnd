import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { MainComponent } from './Components/main/main.component';
import { ProductsComponent } from './Components/products/products.component';
import { SingUpComponent } from './Components/sing-up/sing-up.component';
import { ConfiguracionComponent } from './Components/configuracion/configuracion.component';
import { CrearTiendaComponent } from './Components/crear-tienda/crear-tienda.component';
import { PanelTiendaComponent } from './Components/panel-tienda/panel-tienda.component';
import { PanelAdminComponent } from './Components/panel-admin/panel-admin.component';
import { CarritoComponent } from './Components/carrito/carrito.component';
import { ProductodetalleComponent } from './Components/productodetalle/productodetalle.component';
import { EditarProductoComponent } from './Components/editar-producto/editar-producto.component';
import { AuthGuard } from './Guard/auth-guard/auth.guard'

/* import { sellerGuard } from './Guard/seller.guard' */

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'singup', component: SingUpComponent },
  { path: 'carrito', component: CarritoComponent},
  { path: 'configuracion', component: ConfiguracionComponent, canActivate:[AuthGuard] },
  { path: 'crear-tienda', component: CrearTiendaComponent, canActivate:[AuthGuard]},
  { path: 'panel-tienda', component: PanelTiendaComponent, canActivate:[AuthGuard]},
  { path: 'panel-admin', component: PanelAdminComponent, canActivate:[AuthGuard]},
  { path: 'productos/:id', component: ProductodetalleComponent, canActivate:[AuthGuard]},
  { path: 'productos/:id/editar', component: EditarProductoComponent, canActivate:[AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
