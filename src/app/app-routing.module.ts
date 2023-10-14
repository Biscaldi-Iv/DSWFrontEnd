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

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'singup', component: SingUpComponent },
  { path: 'carrito', component: CarritoComponent},
  { path: 'configuracion', component: ConfiguracionComponent },
  { path: 'crear-tienda', component: CrearTiendaComponent},
  { path: 'panel-tienda', component: PanelTiendaComponent},
  { path: 'panel-admin', component: PanelAdminComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
