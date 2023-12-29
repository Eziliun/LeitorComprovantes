import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CameraCaptureComponent } from './components/camera-capture_functions/camera-capture.component';
import { Camera } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { ExitAppDialogComponent } from './components/exit-app-dialog/exit-app-dialog.component';
import { Dialog, DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [
    HeaderComponent, CameraCaptureComponent, ExitAppDialogComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    OverlayPanelModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule
    
    
    
    
  ],
  exports: [
    HeaderComponent, CameraCaptureComponent, ExitAppDialogComponent
  ],
  providers: [
    { provide: 'Camera', useValue: Camera },
    { provide: 'Capacitor', useValue: Capacitor },
 ],
})
export class SharedModule { }
