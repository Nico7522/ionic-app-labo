import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Register } from '../models/login.model';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {

  registerForm!: FormGroup;
  constructor(private _formBuilder: FormBuilder, private _authService: AuthService) { }
  private _mailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  private _passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  message!: string;
  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, this.phoneNumberValidator()]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(this._mailPattern)]],
      password: ['', [Validators.required, Validators.pattern(this._passwordPattern)]],
    })
  }

  handleSubmit() {
    const user: Register = {
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      phoneNumber: this.registerForm.get('phoneNumber')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
    }
    this._authService.register(user).subscribe({
      next: () => this.message = "Compte créer avec succès. Vérifier vos mail pour l'activer",
      error: (err) => {
        if (err.status === 400) {
          this.message = 'Erreur';
        }
      },
    })
    if(this.registerForm.valid) {
      console.log('ok');
      
    } else {
      console.log(this.registerForm);
      
    }
  }

  phoneNumberValidator(): ValidatorFn | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value != null && control.value.length < 9) {
        return { message: 'invalid' };
      }
      return null;
    };
  }

}
