import { Component, AfterViewInit, OnInit, NgZone } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GlobalService } from './modules/shared/services/global.service';
import { App } from '@capacitor/app';
import { AuthService } from './modules/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  title = 'angular: Leitor Cupons';

  currentUrl: string = window.location.href;

  valueCloseAppDialog: boolean = false;

  constructor(
    public globalService: GlobalService,
    public authService: AuthService,
    private ngZone: NgZone,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.setupOnBackPress();
  }

  async setupOnBackPress() {
    const isAuthenticated = await this.authService.isAuthenticated();
  
    App.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack && isAuthenticated) {
        const currentUrl = this.router.url; 
        if (currentUrl.includes('cupons')) {
          this.ngZone.run(() => {
            this.valueCloseAppDialog = true;
            this.globalService.openCloseAppDialog();
          });
        } else {
          window.history.back();
        }
      } else {
        this.ngZone.run(() => {
          this.valueCloseAppDialog = true;
          this.globalService.openCloseAppDialog();
        });
      }
    });
  }
}
