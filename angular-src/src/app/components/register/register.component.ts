import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { RegisterResponse } from 'src/app/models/RegisterResponse';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name!: String;
  username!: String;
  email!: String;
  password!: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onRegisterSubmit() {

    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
       this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
       this.router.navigate(['/login']);
     } else {
       this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
       this.router.navigate(['/register']); 
     }
    });

    if(!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    } else if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please use a valid email address', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    } else {
      return true;
    }

    
  }
  
  
}
