import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { WebcamModule } from 'ngx-webcam';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { ListaProdutosComponent } from './lista-produtos.component';
import { ListaProdutoRoutingModule } from './lista-produtos-routing.module';
import { CardPageComponent } from '../card-page/card-page.component';





@NgModule({
  declarations: [
    ListaProdutosComponent, 
  ],
  imports: [
    CommonModule,
    ListaProdutoRoutingModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
    DropdownModule,
    WebcamModule,
    ToastModule,
    DialogModule,
    DividerModule,
  ],
  providers: [
    CardPageComponent,
  ]
})
export class ListaProdutoModule { }
