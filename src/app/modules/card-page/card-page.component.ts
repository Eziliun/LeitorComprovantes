import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ResponseCardCupons,
  iCupons,
} from '../shared/interfaces/cupomResponse.interface';
import { CupomService } from '../shared/services/cupom.service';
import { GlobalService } from '../shared/services/global.service';

interface Bandeira {
  bandeiraCartao: string;
}

interface Pagamento {
  formaPagamento: string;
}

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss'],
})
export class CardPageComponent {
  Bandeiras!: Bandeira[];

  Pagamentos!: Pagamento[];

  selectedBandeiras: Bandeira | undefined;

  selectedPagamentos: Pagamento | undefined;

  cupomData!: iCupons[];

  responseDataCupom!: ResponseCardCupons;

  cupomForm!: FormGroup;

  getFailed: boolean = false;

  stream: any = null;
  status: any = null;
  trigger: Subject<void> = new Subject();
  previewImage: string = '';
  btnLabel: string = 'Capture image';

  cupomDetails: iCupons | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private cupomService: CupomService,
    private messageService: MessageService,
    private router: Router,
    private globalService: GlobalService,
  ) {}

  ngOnInit() {
    this.dropDownSelector();
    this.setupForm();
    this.getCupomById();
  }

  dropDownSelector() {
    this.Bandeiras = [
      { bandeiraCartao: 'Visa' },
      { bandeiraCartao: 'MasterCard' },
      { bandeiraCartao: 'Elo' },
      { bandeiraCartao: 'AmericanExpress' },
      { bandeiraCartao: 'Maestro' },
    ];

    this.Pagamentos = [
      { formaPagamento: 'Credito A Vista' },
      { formaPagamento: 'Debito' },
      { formaPagamento: 'Credito 2x' },
      { formaPagamento: 'Credito 3x' },
    ];
  }

  setupForm() {
    this.cupomForm = this.formBuilder.group({
      id: [''],
      bandeira_do_cartao: ['', Validators.required],
      forma_de_pagamento: ['', Validators.required],
      nsu: ['', Validators.required],
      autorizacao: ['', Validators.required],
    });
  }

  getCupomById() {
    this.globalService.showLoadingBar();
    this.cupomService.getCupomDetailsBehavior().subscribe((details) => {
      this.cupomDetails = details;
      this.globalService.hideLoadingBar()
      if(this.cupomDetails == null){
        this.router.navigate(['/cupons']); 
      }
    });
  }

  async tirarFoto() {
    if (this.isFormValid) {
      const foto = await Camera.getPhoto({
        quality: 50,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      const file = this.dataURLtoFile(foto.dataUrl!, 'imagem')

      console.log(foto);
      this.previewImage = foto.dataUrl!;
      this.globalService.showLoadingBar();
      
      if (this.cupomDetails !== null) {
        const request: iCupons = {
          id: this.cupomDetails.id,
          bandeira_do_cartao: this.cupomForm.controls['bandeira_do_cartao'].value,
          forma_de_pagamento: this.cupomForm.controls['forma_de_pagamento'].value,
          nsu: this.cupomForm.controls['nsu'].value,
          autorizacao: this.cupomForm.controls['autorizacao'].value,
          codigo_pedido_interno: undefined,
          imagem: this.previewImage,
        };
        this.cupomService.PutImageCupom(request, file).subscribe({
          next: (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso!',
              detail: 'Cupom Enviado Com Sucesso!',
            });

            this.cupomForm.reset();
            this.previewImage = '';
            this.stream = null;
            this.router.navigate(['/cupons']);
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro!',
              detail: error.message,
            });
            this.globalService.hideLoadingBar();
          },
        });
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Formulário!',
        detail: 'Preencha o Formulário antes de usar a Câmera!',
      });
    }
  }

  get isFormValid(): boolean {
    return this.cupomForm.valid;
  }


   dataURLtoFile(dataURL: string, fileName: string) {
    // Converte a base64 para um array de bytes
    const byteString = atob(dataURL.split(',')[1]);
  
    // Cria um buffer array para armazenar os bytes
    const buffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(buffer);
  
    // Preenche o buffer com os bytes convertidos
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
  
    // Cria um objeto Blob a partir do buffer
    const blob = new Blob([buffer], { type: 'image/png' }); // Substitua 'image/png' pelo tipo correto, se necessário
  
    // Cria um objeto File a partir do Blob
    const file = new File([blob], fileName, { type: blob.type });
  
    return file;
  }
}
