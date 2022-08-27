import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cpab-bar',
  templateUrl: './cpab-bar.component.html',
  styleUrls: ['./cpab-bar.component.scss']
})
export class CpabBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.router.navigate(["/learngenix/signIn"]);
  }
}
