import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
/* componentes */
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LoginComponent } from './Components/login/login.component';
import { UsuarioService } from './services/usuarios/usuario.service';
import { MainComponent } from './Components/main/main.component';
import { ProductsComponent } from './Components/products/products.component';
import { SingUpComponent } from './Components/sing-up/sing-up.component';
import { ConfiguracionComponent } from './Components/configuracion/configuracion.component';
import { CrearTiendaComponent } from './Components/crear-tienda/crear-tienda.component';
import { PanelTiendaComponent } from './Components/panel-tienda/panel-tienda.component';
import { PanelAdminComponent } from './Components/panel-admin/panel-admin.component';
import { CarritoComponent } from './Components/carrito/carrito.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    MainComponent,
    ProductsComponent,
    SingUpComponent,
    ConfiguracionComponent,
    CrearTiendaComponent,
    PanelTiendaComponent,
    PanelAdminComponent,
    CarritoComponent,

  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, ReactiveFormsModule, BrowserAnimationsModule,
  MatFormFieldModule,MatTableModule,MatInputModule,MatIconModule],
  providers: [UsuarioService],
  bootstrap: [AppComponent],
})
export class AppModule {}
