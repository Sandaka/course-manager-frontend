import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginService } from 'src/app/services/user-login.service';

@Component({
  selector: 'app-stub-bar',
  templateUrl: './stub-bar.component.html',
  styleUrls: ['./stub-bar.component.scss']
})
export class StubBarComponent implements OnInit {

  username: any;

  constructor(private router: Router, private userLoginService: UserLoginService) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem("username");
  }

  logout(){
    this.userLoginService.userLogout();
    this.router.navigate(["/learngenix/signIn"]);
  }
}
