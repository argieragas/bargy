import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Login, Register } from 'src/utils/data';
import { AuthenticationService } from 'src/app/client/authentication.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {
  selected = 0

  constructor(@Inject(MAT_DIALOG_DATA) public openType: any,
  private dialogRef: MatDialogRef<LoginDialogComponent>,private authenticationService: AuthenticationService){}
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
  invalid = false

  login() {
    this.authenticationService.login(this.data, this.dialogRef)
  }

  register(){
    console.log(this.regist.code+" ==  maticity", this.regist.code == 'maticity')
    if(this.regist.password == this.regist.confirmpass && this.regist.code == 'maticity'){
      this.authenticationService.register(this.regist, this.dialogRef)
    }else{
      this.invalid = true
    }
  }

  ngOnInit() {
    this.selected = this.openType.index
  }

  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];


  addLink() {
    this.links.push(`Link ${this.links.length + 1}`);
  }
  b = "width: 100px!important"
}
