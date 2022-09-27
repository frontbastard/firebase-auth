import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public isLoginPanel = true;

  public activateSignUpPanel(): void {
    this.isLoginPanel = false;
  }

  public formSubmitted() {
    console.log('login');
  }
}
