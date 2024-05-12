import { Component } from '@angular/core';
import { LoginDTO } from '../../dto/login-dto';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginDTO:LoginDTO;

  constructor(private router:Router) {
    this.loginDTO = new LoginDTO();
    }

  public login() {

    const rol = "CLIENTE";
    console.log(this.loginDTO);

    if( rol == "CLIENTE" ){
      this.router.navigate(["/inicio-cliente"]);
    }else{
      this.router.navigate(["/inicio-moderador"]);
    }
  }

}
