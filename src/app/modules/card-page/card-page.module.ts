import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CardPageComponent } from './card-page.component';
import { CardPageRoutingModule } from './card-page-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { WebcamModule } from 'ngx-webcam';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { Divider, DividerModule } from 'primeng/divider';

@NgModule({
  declarations: [CardPageComponent],
  imports: [
    CommonModule,
    CardPageRoutingModule,
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
})
export class CardPageModule {}
