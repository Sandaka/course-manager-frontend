import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  systemLogin() {
    console.log(this.password + "--" + this.username);
    if (this.username === 'jobseeker') {
      if (this.password === '1234') {
        this.router.navigate(["/js/home"]);
      } else {
        console.log("Wrong password!")
      }
    } else {
      console.log("Wrong username!")
    }

  }
}
