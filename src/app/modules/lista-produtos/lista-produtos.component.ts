import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GlobalService } from '../shared/services/global.service';
import { Router } from '@angular/router';
import { CardPageComponent } from '../card-page/card-page.component';
import { CupomService } from '../shared/services/cupom.service';
import { iCupons } from '../shared/interfaces/cupomResponse.interface';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.scss']
})
export class ListaProdutosComponent implements OnInit {

  cupomData!: iCupons[];


  getFailed: boolean = false;

  
  constructor(
    private cupomService: CupomService,
    private messageService: MessageService,
    private global: GlobalService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getNoImageCupons();
  }


  getNoImageCupons() {
    this.global.showLoadingBar();
    this.cupomService.getNoImageCupons().subscribe({
      next: (res) => {
        console.log(res);
        this.cupomData = res.result; 
        this.global.hideLoadingBar();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro!',
          detail: 'Problema ao se conectar com o Servidor. Tente Novamente',
        });
        this.getFailed = true;
        this.global.hideLoadingBar();
        console.log(error);
        this.global.hideLoadingBar();
      },
    });
  }

  pageCupomSendImage(id: number) {

    this.cupomService.getAllCuponsByID(id).subscribe({
      next:(res) => {
      this.router.navigate(['/cupom',res.result[0].id]); 
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro!',
          detail: 'Problema no Redirecionamento...',
        });
        console.log(error)
      }
    })
  }
}
