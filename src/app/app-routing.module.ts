import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './containers/default-layout/default-layout.component';
import { FullscreenLayoutComponent } from './containers/fullscreen-layout/fullscreen-layout.component';
import { LearngenixDashboardComponent } from './learngenix/learngenix-dashboard/learngenix-dashboard.component';
import { SchoolRegistrationComponent } from './lg-common/school-registration/school-registration.component';
import { StudentSelfRegistrationComponent } from './lg-common/student-self-registration/student-self-registration.component';
import { CourseProviderDashboardComponent } from './lg-course-provider/course-provider-dashboard/course-provider-dashboard.component';
import { VerifyApplicationComponent } from './lg-course-provider/verify-application/verify-application.component';
import { VerifyPaymentsComponent } from './lg-course-provider/verify-payments/verify-payments.component';
import { CreateCourseComponent } from './lg-course/create-course/create-course.component';
import { StudentForumComponent } from './lg-forum/student-forum/student-forum.component';
import { LgHomeComponent } from './lg-home/lg-home.component';
import { LoginComponent } from './lg-user/login/login.component';
import { BronzePkgGuard } from './route-guards/bronze-pkg.guard';
import { CPAdminGuard } from './route-guards/cpadmin.guard';
import { CPCoordinatorGuard } from './route-guards/cpcoordinator.guard';
import { StudentGuard } from './route-guards/student.guard';
import { SuperAdminGuard } from './route-guards/super-admin.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'learngenix',
  },
  // {
  //   path: 'lg',
  //   component: FullscreenLayoutComponent,
  //   children: [
  //     { path: '', component: LgHomeComponent },
  //     { path: 'signIn', component: LoginComponent },
  //     { path: 'signUp', component: LoginComponent },
  //     { path: 'school_registration', component: SchoolRegistrationComponent },
  //     { path: 'student_registration', component: StudentSelfRegistrationComponent }
  //   ]
  // },
  // {
  //   path: 'lg',
  //   component: DefaultLayoutComponent,
  //   children: [
  //     { path: 'dashboard', component: LearngenixDashboardComponent },
  //     { path: 'cp_dashboard', component: CourseProviderDashboardComponent },
  //     { path: 'cp_verify_application', component: VerifyApplicationComponent },
  //     { path: 'cp_verify_payment', component: VerifyPaymentsComponent },
  //     { path: 'student_forum', component: StudentForumComponent }
  //   ]
  // },
  {
    path: 'learngenix',
    component: FullscreenLayoutComponent,
    children: [
      { path: '', component: LgHomeComponent },
      { path: 'home', component: LgHomeComponent },
      { path: 'signIn', component: LoginComponent },
      { path: 'signUp', component: LoginComponent },
      { path: 'school_registration', component: SchoolRegistrationComponent },
      { path: 'student_registration', component: StudentSelfRegistrationComponent }
    ]
  },
  {
    path: 'admin',
    component: DefaultLayoutComponent,
    canActivate: [SuperAdminGuard],
    children: [
      { path: '', component: LearngenixDashboardComponent },
      { path: 'dashboard', component: LearngenixDashboardComponent },
    ]
  },
  {
    path: 'cpadmin',
    component: DefaultLayoutComponent,
    canActivate: [CPAdminGuard, BronzePkgGuard],
    children: [
      { path: '', component: CourseProviderDashboardComponent },
      { path: 'cp_dashboard', component: CourseProviderDashboardComponent },
      { path: 'cp_verify_application', component: VerifyApplicationComponent },
      { path: 'cp_verify_payment', component: VerifyPaymentsComponent },
      { path: 'create_course', component: CreateCourseComponent }
    ]
  },
  {
    path: 'cpcoordinator',
    component: DefaultLayoutComponent,
    canActivate: [CPCoordinatorGuard, BronzePkgGuard],
    children: [
      { path: '', component: CourseProviderDashboardComponent },
      { path: 'cp_dashboard', component: CourseProviderDashboardComponent },
      { path: 'cp_verify_application', component: VerifyApplicationComponent },
      { path: 'cp_verify_payment', component: VerifyPaymentsComponent },
      { path: 'create_course', component: CreateCourseComponent }
    ]
  },
  {
    path: 'student',
    component: DefaultLayoutComponent,
    canActivate: [StudentGuard, BronzePkgGuard],
    children: [
      { path: '', component: StudentForumComponent },
      { path: 'student_forum', component: StudentForumComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
