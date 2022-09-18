import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { UserLoginService } from 'src/app/services/user-login.service';

@Component({
  selector: 'app-cpab-bar',
  templateUrl: './cpab-bar.component.html',
  styleUrls: ['./cpab-bar.component.scss']
})
export class CpabBarComponent implements OnInit {

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  constructor(private router: Router, private userLoginService: UserLoginService) { }

  ngOnInit(): void {
  }

  logout(){
    this.userLoginService.userLogout();
    this.router.navigate(["/learngenix/signIn"]);
  }
}
