import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Login } from '../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private _mailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  private _passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  loginForm!: FormGroup;
  message!: string;
  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(this._mailPattern)]],
      password: ['', [Validators.required, Validators.pattern(this._passwordPattern)]],
    });
  }

  handleSubmit(): void {
    if (this.loginForm.valid) {
      const loginform: Login = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      };
      this._authService.login(loginform).subscribe({
        error: (err) => {
          if (err.status === 400) {
            this.message = 'Erreur';
          }
        },
      });
    }
  }
}
