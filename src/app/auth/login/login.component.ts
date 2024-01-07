
import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/client/authentication.service';
import { Login, Register } from 'src/utils/data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  data: Login = {
    email: '',
    password: ''
  }

  regist: Register = {
    name: '',
    address: '',
    position: 'unknown',
    committee: 'unknown',
    email: '',
    password: '',
    code: '',
    confirmpass: ''
  }

  constructor(private authenticationService: AuthenticationService) {}


  login() {
    this.authenticationService.login(this.data, '')
  }

  register(){
    if(this.regist.password == this.regist.confirmpass){
      this.authenticationService.register(this.regist, '')
    }
  }

  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];


  addLink() {
    this.links.push(`Link ${this.links.length + 1}`);
  }
  b = "width: 100px!important"
}
