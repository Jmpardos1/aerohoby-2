import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdenCompraListComponent } from './orden-compra/orden-compra-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/ordenes-compra', pathMatch: 'full' },
  { path: 'ordenes-compra', component: OrdenCompraListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
