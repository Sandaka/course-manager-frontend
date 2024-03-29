import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { delay, filter } from 'rxjs/operators';
import { CourseProviderDashboardComponent } from 'src/app/lg-course-provider/course-provider-dashboard/course-provider-dashboard.component';

@UntilDestroy()
@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  privilege: any;//"CPAB"

  constructor(private observer: BreakpointObserver, private router: Router) { }

  ngOnInit(): void {
    if(window.sessionStorage.getItem('packageCode') === null){
      this.router.navigate(["/learngenix/signIn"])
    }else{
      let p = window.sessionStorage.getItem('packageCode');
      this.privilege = p;
      //this.privilege = JSON.parse(window.sessionStorage.getItem('packageCode') || '');
      //console.log(p);
    }
    console.log(this.privilege);
  }

  ngAfterViewInit() {

    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }
}
