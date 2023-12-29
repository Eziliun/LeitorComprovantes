import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { AuthService } from './services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { iLogin } from './interfaces/auth.interface';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
import * as CryptoJS from 'crypto-js';
import { GlobalService } from '../shared/services/global.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private global: GlobalService
  ) {}

  ngOnInit(): void {
    this.loginFormulario();
  }

  loginForm!: FormGroup;

  requestLogin!: iLogin;

  loginFormulario() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  encrypt(value: string, key: string) {
    return CryptoJS.AES.encrypt(value, key).toString();
  }

  login() {
    this.requestLogin = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      stayLogged: false,
    };

    const loginRequestBody = {
      login: this.encrypt(
        JSON.stringify(this.requestLogin),
        environment.JWT_LOGIN_SECRET
      ),
    };

    if (this.loginForm.valid) {
      this.authService.login(loginRequestBody).subscribe({
        next: async (resp) => {
          if (resp.access_token) {
            await Preferences.set({
              key: 'access_token',
              value: resp.access_token,
            });
            this.router.navigate(['/cupons']);
          }
        },
        error: (err) => {
          this.messageService.add({
            key: 'tc',
            severity: 'error',
            summary: 'Error',
            detail: err,
          });
        },
      });
    }
  }

  showEmailError(): boolean {
    const emailControl = this.loginForm.get('email');
    return !!(
      emailControl?.invalid &&
      (emailControl?.touched || emailControl?.dirty)
    );
  }

  showPasswordError(): boolean {
    const passwordControl = this.loginForm.get('senha');
    return !!(
      passwordControl?.invalid &&
      (passwordControl?.touched || passwordControl?.dirty)
    );
  }
}
