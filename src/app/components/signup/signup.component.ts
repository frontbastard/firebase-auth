import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  @ViewChild('form') form!: NgForm;

  constructor(public authService: AuthService) {}

  public submitted(): void {
    this.authService.createUser(this.form.value);
  }
}
