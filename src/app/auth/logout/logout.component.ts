import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/_shared/helpers/snackbar.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(public authService:AuthService, private snackBar: SnackBarService, public router:Router) { }

  ngOnInit() {
    this.authService.logout()
    // this.snackBar.openSnackBar("Usuário deslogado com sucesso!")
    this.router.navigate(['/auth/login']);
    
  }
}
