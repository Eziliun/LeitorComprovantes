import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Modal } from "bootstrap";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-camera-capture',
  templateUrl: './camera-capture.component.html',
  styleUrls: ['./camera-capture.component.scss'],
})
export class CameraCaptureComponent implements OnInit {

  @ViewChild('modalCaptura') modalCaptura!: ElementRef;
  @ViewChild('video',{ static: true }) public video!: ElementRef;
  @ViewChild('loader') loader!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;
  @ViewChild('imgPreview') imgPreview!: ElementRef<HTMLCanvasElement>;
  @Output() photo = new EventEmitter<Object>();
  @Output() mediaPermission = new EventEmitter<boolean>();
  
  stream!: MediaStream;
  image_data_url: string = '';
  imageFile!: File | null;
  modal!: Modal;
  detection: any;
  resizedDetections: any;
  canvasEl: any;
  displaySize: any;
  videoInput: any;
  tzoffset = (new Date()).getTimezoneOffset() * 60000;
  startDateTime!: string;
  sendStatus: number = 0;
  tipoErro: string = '';
  interval!: any;
 
  WIDTH = 465;
  HEIGHT = 320;

  constructor(
    private elRef: ElementRef,
  ) { }

  async ngOnInit(): Promise<void> {
   
  }

  

  async startVideo() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({  
        video: {
          width: 800 ,
          height: 600 ,
          frameRate: 30 ,
          facingMode: "user",
          noiseSuppression: true
        }
      });
      this.videoInput = this.video.nativeElement;
      this.videoInput.setAttribute("playsinline", true);
      this.videoInput.controls = false;
      this.videoInput.srcObject = this.stream;
      this.videoInput.controls = false;
       this.videoInput.controlsList = "nodownload";
      this.mediaPermission.emit(true);
    } catch (error) {
      console.log("Erro ao acessar a câmera: ", error);
      this.mediaPermission.emit(false);

      this.cancelarFoto();
    }
  }

  finalizarCaptura() {
    clearInterval(this.interval);
    this.videoInput.removeAllListeners();
    this.videoInput.srcObject = undefined;
    if (this.elRef.nativeElement) {
      this.elRef.nativeElement.querySelector('video').removeAllListeners();
      this.elRef.nativeElement.querySelector('canvas').remove();
    }
  }

  tirarFoto() {
   	this.image_data_url = (<HTMLCanvasElement>this.canvas.nativeElement).toDataURL('image/jpeg');
    this.imageFile = this.dataURLtoFile(this.image_data_url, 'photo');
  }

  repetirFoto() {
    this.image_data_url = '';
    this.photo.emit({string: this.image_data_url, file: ''});
  }

  cancelarFoto() {
    const tracks = this.stream.getTracks();
    tracks.forEach(track => track.stop());
    this.canvasEl = undefined;
    clearInterval(this.interval);
    this.videoInput.srcObject = undefined;
    if (this.elRef.nativeElement) {
      this.elRef.nativeElement.querySelector('video').removeAllListeners();
      this.elRef.nativeElement.querySelector('canvas').remove();
    }
    this.modal.hide();
  }

  salvarImagem() {
    (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d')?.drawImage(this.video.nativeElement, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.image_data_url = (<HTMLCanvasElement>this.canvas.nativeElement).toDataURL('image/jpeg');
    this.imageFile = this.dataURLtoFile(this.image_data_url, 'photo');
    this.photo.emit({string: this.image_data_url, file: this.imageFile});
    clearInterval(this.interval)
    const tracks = this.stream.getTracks();
    tracks.forEach(track => track.stop());
    this.videoInput.srcObject = undefined;
  }

  dataURLtoFile(dataurl: string, filename: string) {
 
    var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)![1],
    bstr = atob(arr[1]), 
    n = bstr.length, 
    u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
  }    

}
