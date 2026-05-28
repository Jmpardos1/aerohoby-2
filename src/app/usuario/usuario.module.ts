import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuarioAdminComponent } from './usuario-admin/usuario-admin.component';
import { RecuperarContrasenaComponent } from './recuperar-contrasena/recuperar-contrasena.component';
import { PublicNavComponent } from '../shared/public-nav/public-nav.component';
import { FooterComponent } from '../shared/footer/footer.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PerfilComponent,
    UsuarioAdminComponent,
    RecuperarContrasenaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PublicNavComponent,
    FooterComponent
  ]
})
export class UsuarioModule { }
