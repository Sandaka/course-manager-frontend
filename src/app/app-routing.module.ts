import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './containers/default-layout/default-layout.component';
import { FullscreenLayoutComponent } from './containers/fullscreen-layout/fullscreen-layout.component';
import { LearngenixDashboardComponent } from './learngenix/learngenix-dashboard/learngenix-dashboard.component';
import { SchoolRegistrationComponent } from './lg-common/school-registration/school-registration.component';
import { CourseProviderDashboardComponent } from './lg-course-provider/course-provider-dashboard/course-provider-dashboard.component';
import { LgHomeComponent } from './lg-home/lg-home.component';
import { LoginComponent } from './lg-user/login/login.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'lg',
  },
  {
    path: 'lg',
    component: FullscreenLayoutComponent,
    children: [
      { path: '', component: LgHomeComponent },
      { path: 'signIn', component: LoginComponent },
      { path: 'signUp', component: LoginComponent },
      { path: 'registration', component: SchoolRegistrationComponent }
    ]
  },
  {
    path: 'lg',
    component: DefaultLayoutComponent,
    children: [
      { path: 'dashboard', component: LearngenixDashboardComponent },
      { path: 'cp_dashboard', component: CourseProviderDashboardComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
