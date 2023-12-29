import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {


  constructor(
  ) { }

    isLoading: boolean = false;

    closeAppDialog: boolean = false;

  openCloseAppDialog(){

  if(this.closeAppDialog){
  this.closeAppDialog = false
  }else {
  this.closeAppDialog = true;
  }

  }

  closeCloseAppDialog(){
    this.closeAppDialog = false
  }

  dialog(): boolean{
    return this.closeAppDialog
  }

  isCloseAppDialog(): boolean{
   return this.closeAppDialog;
  }

  showLoadingBar(){
    this.isLoading = true;
  }

  hideLoadingBar(){
    this.isLoading = false
  }

  isLoadingBar(): boolean {
    return this.isLoading;
  }
}
