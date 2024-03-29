import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from './default-layout.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSortModule } from '@angular/material/sort';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LearngenixModule } from 'src/app/learngenix/learngenix.module';
import { LgCourseProviderModule } from 'src/app/lg-course-provider/lg-course-provider.module';
import { StudentForumComponent } from 'src/app/lg-forum/student-forum/student-forum.component';
import { LgForumModule } from 'src/app/lg-forum/lg-forum.module';
import { LgsaBarComponent } from 'src/app/sidebars/super-admin/lgsa-bar/lgsa-bar.component';
import { CpabBarComponent } from 'src/app/sidebars/bronze/cpab-bar/cpab-bar.component';
import { CpubBarComponent } from 'src/app/sidebars/bronze/cpub-bar/cpub-bar.component';
import { StubBarComponent } from 'src/app/sidebars/bronze/stub-bar/stub-bar.component';
import { LgCourseModule } from 'src/app/lg-course/lg-course.module';



@NgModule({
  declarations: [
    DefaultLayoutComponent,
    LgsaBarComponent,
    CpabBarComponent,
    CpubBarComponent,
    StubBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    LearngenixModule,
    LgCourseProviderModule,
    LgForumModule,
    LgCourseModule,
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
    MatSnackBarModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatSortModule,
    MatNativeDateModule,
    MatCheckboxModule,
    NgxMatSelectSearchModule,
    MatToolbarModule,
    MatProgressBarModule
  ]
})
export class DefaultLayoutModule { }
