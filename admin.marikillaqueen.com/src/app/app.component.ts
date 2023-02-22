import { Component } from '@angular/core';
import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'admin-panel';

  constructor(private login: LoginService) {}

  ngOnInit() {
    this.login
      .doLogin({ email: '', password: '' })
      .then(console.log)
      .catch(console.error);
  }
}
