import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { App } from '@capacitor/app';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-exit-app-dialog',
  templateUrl: './exit-app-dialog.component.html',
  styleUrls: ['./exit-app-dialog.component.scss']
})
export class ExitAppDialogComponent implements OnInit {
  closeAppDialog:boolean = false 

  constructor(
    public globalService: GlobalService
    ) {

    }


  ngOnInit(): void {
    this.setupCloseAppDialog();
  }

  cancelarCloseAppDialog(){
    this.globalService.openCloseAppDialog();
    this.closeAppDialog = this.globalService.dialog()
    location.reload();
  }

  aceitarCloseAppDialog(){
    App.exitApp();
  }

  setupCloseAppDialog(){
    this.closeAppDialog = this.globalService.dialog()
  }

}