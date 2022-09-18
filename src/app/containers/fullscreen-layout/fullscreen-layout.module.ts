import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullscreenLayoutComponent } from './fullscreen-layout.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from 'src/app/lg-user/login/login.component';
import { LgHomeComponent } from 'src/app/lg-home/lg-home.component';
import { SchoolRegistrationComponent } from 'src/app/lg-common/school-registration/school-registration.component';
import { LgCommonModule } from 'src/app/lg-common/lg-common.module';



@NgModule({
  declarations: [
    FullscreenLayoutComponent,
    LoginComponent,
    LgHomeComponent
  ],
  imports: [
    CommonModule,
    LgCommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatExpansionModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
  ]
})
export class FullscreenLayoutModule { }
