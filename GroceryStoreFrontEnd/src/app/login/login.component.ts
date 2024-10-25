import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserAuthService } from '../services/user-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  login(loginForm: NgForm) {

    if(loginForm.value.userName===''|| loginForm.value.userName===null)
    {
        this._snackBar.open("Email is required.",'Ok',{duration:3000})
        return
    }
    if(loginForm.value.userPassword===''|| loginForm.value.userPassword===null)
    {
        this._snackBar.open("Password is required.",'Ok',{duration:3000})
        return
    }
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);

        const role = response.user.role[0].roleName;

        
        if (role === 'Admin') {
       
        // Swal.fire({
        //   title: 'Admin Login Successful',
        //   icon: 'success',
        //   showClass: {
        //     popup: 'animate__animated animate__fadeInDown'

        //   },
        //   hideClass: {
        //     popup: 'animate__animated animate__fadeOutUp'
        //   }
        // })
          
        this.router.navigate(['']);
      
        } else {
          //           Swal.fire({
          //   title: 'Login Successful',
          //   icon: 'success',
          //   showClass: {
          //     popup: 'animate__animated animate__fadeInDown'

          //   },
          //   hideClass: {
          //     popup: 'animate__animated animate__fadeOutUp'
          //   }
          // })
            
          this.router.navigate(['']);
        }
      },
      (error) => {Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid username or password. Try Again!',
      
      })
        console.log(error);
      }
    );
  }

  registerUser() {
    this.router.navigate(['/register']);
  }
}