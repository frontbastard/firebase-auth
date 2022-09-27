import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @ViewChild('form') form!: NgForm;

  constructor(public authService: AuthService) {}

  public submitted(): void {
    this.authService.loginUser(this.form.value);
  }
}
