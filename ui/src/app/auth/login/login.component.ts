import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone:true,
  imports:[CommonModule, ReactiveFormsModule]
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private _authService: AuthServiceService, private _router: Router){
    this.loginForm = this.fb.group({
      email: "",
      password: "",
    });
  }


  onSubmit(){
    if(this.loginForm.valid){
      this._authService.loginUser(this.loginForm.value).subscribe({
        next: (val: any) => {
          //console.log('user logged-in',this.loginForm.value);
          //this._authService.isLoggedIn$.next(true);
          //this._authService.loginStorage();
          console.log('Success:', val.message);
          this._router.navigate(['status-view']);
          
        },
        error: (err:any) => {
          console.error(err);
        }
      })
    }
  }

  redirectToRegister(){
    this._router.navigate(['register']);
  }

}
