import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './modules/auth/services/auth-guard.service';

const routes: Routes = [
  {
    path: 'login', 
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    title:"Login Banco de Notas",
  },

  {
    path: 'cupons', 
    loadChildren: () => import('./modules/lista-produtos/lista-produtos.module').then(m => m.ListaProdutoModule),
    title:"Lista de Cupons",
    canActivate: [authGuard]
  },

  {
    path: 'cupom/:id', 
    loadChildren: () => import('./modules/card-page/card-page.module').then(m => m.CardPageModule),
    title:"Enviar Cupom",
    canActivate: [authGuard]
  },

  {
    path: '',
    redirectTo: 'cupons',
    pathMatch:'full',
    canMatch: []
  },

  {
    path: '**',
    redirectTo: 'cupons', 
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
