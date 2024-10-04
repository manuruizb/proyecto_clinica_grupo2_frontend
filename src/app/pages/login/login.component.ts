import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Dialogtype, { Dialog } from '../../libs/dialog.lib';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthService,
  private router: Router) { }

  async login() {
    if (this.loginForm.invalid) {
      Dialog.show('Debes ingresar el usuario y la contraseña', Dialogtype.warning);
      return;
    }

    const response = await firstValueFrom(this.authService.auth(this.loginForm.getRawValue()));

    if(response.access){
      this.authService.writeToken(response);
      this.router.navigate(['/pacientes']);
    }
  }
}
