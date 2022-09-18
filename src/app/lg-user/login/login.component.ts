import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUserDetail } from 'src/app/models/login-user-detail';
import { UserLoginService } from 'src/app/services/user-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // username: string = 'sandaka';
  // password: string = "1234";
  loginForm!: FormGroup;
  userDetail!: LoginUserDetail;
  loginErrorMsg: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private userLoginService: UserLoginService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  systemLogin(loginUserDetail: LoginUserDetail) {
    this.userLoginService.userLogin(loginUserDetail).subscribe(data => {
      console.log(data), (error: any) => console.log(error)
      if (data) {
        this.userDetail = data;
        if (this.userDetail.statusMsg === 'SUCCESS') {
          window.sessionStorage.setItem('username', this.userDetail.username);
          window.sessionStorage.setItem('packageCode', this.userDetail.packageCode);
          window.sessionStorage.setItem('smsUserId', this.userDetail.smsUserId);
          window.sessionStorage.setItem('smsAccountId', this.userDetail.smsAccountId);
          if (this.userDetail.packageCode === 'LGSA') {
            this.router.navigate(["/admin"]);
          } else if (this.userDetail.packageCode === 'CPAB') {
            this.router.navigate(["/cpadmin"]);
          } else if (this.userDetail.packageCode === 'CPUB') {
            this.router.navigate(["/cpadmin"]);
          } else if (this.userDetail.packageCode === 'STUB') {
            this.router.navigate(["/student"]);
          } else {
            this.router.navigate(["learngenix/signIn"]);
          }
        } else {
          this.loginErrorMsg = "Please check your username/password again.";
        }
      } else {
        console.log("Error while login!");
        this.loginErrorMsg = "Something went wrong!";
      }
    })


    //console.log(this.password + "--" + this.username);
    // if (this.username === 'esoft') {
    //   if (this.password === '1234') {
    //     this.router.navigate(["/cpadmin"]);
    //   } else {
    //     console.log("Wrong password!")
    //   }
    // } else if (this.username === 'sandaka') {
    //   this.router.navigate(["/student"]);
    // } else {
    //   console.log("Wrong username!")
    // }

  }
}
