import { Component } from '@angular/core';
import { LoginDTO } from '../../dto/login-dto';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Alerta } from '../../dto/alerta';
import { AuthService } from '../../servicios/auth.service';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  alerta!: Alerta;
  loginDTO: LoginDTO;
  logModerador: boolean;

  constructor(private router: Router, private authService: AuthService, private tokenService: TokenService) {
    this.loginDTO = new LoginDTO();
    this.logModerador = true;
  }

  public async login() {
    
   this.authService.loginCliente(this.loginDTO).subscribe({
      next: data => {
        this.tokenService.login(data.respuesta.token);
      },
      error: error => {

        this.alerta = new Alerta(error.error.respuesta, "danger");
      }
    });

  }
}   
