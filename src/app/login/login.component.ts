import { LoginService } from './../login.service';
import { Component } from '@angular/core';
import { Login } from '../login';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  login:Login=new Login();

  constructor(private loginService:LoginService,private router:Router){}

  loginClick(){
    //alert('Hello World');
    //alert(this.login.username);

    this.loginService.login(this.login).subscribe(
      (response)=>{
        this.router.navigateByUrl("/home");
      },
      (error)=>{
        alert('Wrong Username/Password');
        this.login.username="",
        this.login.password=""
      }
    )
  }
  
  newChange(): void {
    this.router.navigateByUrl('/register');
}

}
