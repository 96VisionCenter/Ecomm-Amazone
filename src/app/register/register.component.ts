import { RegisterService } from './../register.service';
import { Component } from '@angular/core';
import { Register } from '../register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  newRegister: Register = new Register();
  constructor(private registerService:RegisterService,private router:Router){}


  registerClick() {
    
    
    this.registerService.Registeruser(this.newRegister).subscribe(
      (response) => {
      
        alert('Data saved successfully');
        this.router.navigate(['login']);
      },
      
      (error) => {
        
        console.log('Error:', error);
      }
    );
  }
  newChange(): void {
    this.router.navigateByUrl('/login');
}
}
