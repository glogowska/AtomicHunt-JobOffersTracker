import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone:true,
  imports:[CommonModule, ReactiveFormsModule]
})

export class RegisterComponent{
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private _authService: AuthServiceService, private _router: Router){
    this.registerForm = this.fb.group({
      firstName: "",
      lastName: "",
      username:"",
      email: "",
      password: "",
      confirmedPassword: "",
    });
  }

  onSubmit(){
    if(this.registerForm.value.password === this.registerForm.value.confirmedPassword && this.registerForm.valid){
       
      this._authService.registerUser(this.registerForm.value).subscribe({
        next: (val: any) => {
          console.log('Success:', val.message);
          this.registerForm.reset();
          this.redirectToLogin();
          
        },
        error: (err:any) => {
          console.error('Error:', err.error.message);
        }
      })
    }
  }

  redirectToLogin(){
    this._router.navigate(['login']);
  }
}

