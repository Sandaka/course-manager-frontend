import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from 'src/app/models/course';
import { VerifyStudentApplication } from 'src/app/models/verify-student-application';
import { CourseService } from 'src/app/services/course.service';
import { StudentService } from 'src/app/services/student.service';


interface Pokemon {
  value: string;
  viewValue: string;
}

// interface Course {
//   disabled?: boolean;
//   name: string;
//   pokemon: Pokemon[];
// }


export interface UserData {
  id: string;
  full_name: string;
  email: string;
  telephone: string;
}

@Component({
  selector: 'app-verify-payments',
  templateUrl: './verify-payments.component.html',
  styleUrls: ['./verify-payments.component.scss']
})
export class VerifyPaymentsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'full_name', 'email', 'telephone', 'amount', 'status', 'date', 'verify', 'reject'];
  //dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  verifyApplicationsForm!: FormGroup;
  studentApplicationList: VerifyStudentApplication[] = [];
  dataSource: MatTableDataSource<VerifyStudentApplication> = new MatTableDataSource<VerifyStudentApplication>([]);
  offerName: string = '';
  offerId: any;

  courseList: Course[] = [];

  constructor(private fb: FormBuilder, private studentService: StudentService, private _snackBar: MatSnackBar, private courseService: CourseService) {

  }

  ngOnInit(): void {
    this.loadCourseBySmsAccountId();

    this.verifyApplicationsForm = this.fb.group({
      courseId: new FormControl(''),
      branchId: new FormControl(''),
      offerId: new FormControl(''),
      batchId: new FormControl(''),
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadNewStudents() {
    if (this.verifyApplicationsForm.value) {
      this.studentService.getPaidStudentsByCourseAndBranchId(this.verifyApplicationsForm.controls['courseId'].value, this.verifyApplicationsForm.controls['branchId'].value).subscribe(data => {
        console.log(data), (error: any) => console.log(error)
        if (data) {
          this.studentApplicationList = data;
          this.offerName = this.studentApplicationList[0].offerName;
          this.offerId = this.studentApplicationList[0].courseOfferId;
          this.dataSource = new MatTableDataSource(this.studentApplicationList);

          this.verifyApplicationsForm.patchValue({
            offerId: this.offerId
          })
        } else {
          console.log("error while students details loading!");
        }
      })
    } else {
      console.log("Please select course and branch!");
    }
  }

  verifyPayment(verifyStudentApplication: VerifyStudentApplication) {
    console.log("Course id: " + verifyStudentApplication.courseId);
    verifyStudentApplication.batchId = this.verifyApplicationsForm.controls['batchId'].value;
    verifyStudentApplication.courseOfferId = this.verifyApplicationsForm.controls['offerId'].value;
    verifyStudentApplication.branchId = this.verifyApplicationsForm.controls['branchId'].value;
    verifyStudentApplication.username = window.sessionStorage.getItem('username');
    verifyStudentApplication.smsAccountId = window.sessionStorage.getItem('smsAccountId');

    this.studentService.verifyAndEnrollStudent(verifyStudentApplication).subscribe(data => {
      console.log(data), (error: any) => console.log(error)
      if (data) {
        this.showSuccessSnackbar("Student verification submitted successfully!", 'close', '4000')
        this.loadNewStudents();
      } else {
        this.showErrorSnackbar("Something went wrong!", 'close', '4000');
      }
      
    })
    this.showSuccessSnackbar("Student verification submitted successfully!", 'close', '4000')
    this.loadNewStudents();
  }

  loadCourseBySmsAccountId() {
    this.courseService.getCoursesBySmsAccountId(sessionStorage.getItem("smsAccountId")).subscribe(data => {
      console.log(data), (error: any) => console.log(error)
      if (data) {
        this.courseList = data;
      }
    })
  }

  branchList = [
    { id: 1, branchName: 'Colombo' },
    { id: 2, branchName: 'Horana' }
  ]
  batchList = [
    { id: 1, batchName: 'BIT2023C1' },
    { id: 1, batchName: 'BIT2023C2' }
  ]
  // courseList: Course[] = [
  //   {
  //     name: 'Bachelors',
  //     pokemon: [
  //       { value: '1', viewValue: 'Bachelor in IT' },
  //       { value: '2', viewValue: 'BSc in Software Engineering' },
  //       { value: '3', viewValue: 'BSc in Business Management' },
  //     ],
  //   },
  //   {
  //     name: 'Masters',
  //     pokemon: [
  //       { value: '4', viewValue: 'MSc in IT' },
  //       { value: '5', viewValue: 'MSc in Software Engineering' },
  //       { value: '6', viewValue: 'MSc in Business Management' },
  //     ],
  //   },
  //   {
  //     name: 'Doctoral',
  //     disabled: true,
  //     pokemon: [
  //       { value: 'charmander-6', viewValue: 'IT' },
  //       { value: 'vulpix-7', viewValue: 'Business' },
  //       { value: 'flareon-8', viewValue: 'Arts' },
  //     ],
  //   },
  //   {
  //     name: 'Diploma',
  //     pokemon: [
  //       { value: 'mew-9', viewValue: 'Computing' },
  //       { value: 'mewtwo-10', viewValue: 'English' },
  //     ],
  //   },
  // ];


  showSuccessSnackbar(content: any, action: any, duration: any) {
    let sb = this._snackBar.open(content, action, {
      duration: duration,
      verticalPosition: "bottom", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "end", // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ["success-style"]
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }

  showErrorSnackbar(content: any, action: any, duration: any) {
    let sb = this._snackBar.open(content, action, {
      duration: duration,
      verticalPosition: "bottom", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "end", // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ["error-style"]
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }
}
