import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from 'src/app/models/course';
import { VerifyStudentApplication } from 'src/app/models/verify-student-application';
import { CourseService } from 'src/app/services/course.service';
import { StudentService } from 'src/app/services/student.service';
import { ViewStudentApplicationComponent } from '../view-student-application/view-student-application.component';


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

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Component({
  selector: 'app-verify-application',
  templateUrl: './verify-application.component.html',
  styleUrls: ['./verify-application.component.scss']
})
export class VerifyApplicationComponent implements OnInit {

  displayedColumns: string[] = ['id', 'full_name', 'email', 'telephone', 'verify', 'reject'];
  //dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  verifyApplicationsForm!: FormGroup;
  studentApplicationList: VerifyStudentApplication[] = [];
  dataSource: MatTableDataSource<VerifyStudentApplication> = new MatTableDataSource<VerifyStudentApplication>([]);

  studentDetails!: VerifyStudentApplication;

  courseList: Course[] = [];
  noStudents: string = '';
  noStu: boolean = false;

  constructor(private fb: FormBuilder, private studentService: StudentService, private courseService: CourseService, public dialog: MatDialog) {
    // // Create 100 users
    // const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    //this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit(): void {

    this.loadCourseBySmsAccountId();

    this.verifyApplicationsForm = this.fb.group({
      courseId: new FormControl(''),
      branchId: new FormControl(''),
    });
  }


  openDialog(studentApplication: VerifyStudentApplication) {
    console.log(studentApplication)
    const dialogRef = this.dialog.open(ViewStudentApplicationComponent, {
      width: '1000px',
      data: { callback: this.callBack.bind(this), defaultValue: studentApplication }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.loadNewStudents();
    });
  }

  callBack(studentApplication: VerifyStudentApplication) {
    this.studentDetails = studentApplication;
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
      this.studentService.getNewStudentsByCourseAndBranchId(this.verifyApplicationsForm.controls['courseId'].value, this.verifyApplicationsForm.controls['branchId'].value).subscribe(data => {
        console.log(data), (error: any) => console.log(error)
        if (data) {
          this.studentApplicationList = data;
          this.dataSource = new MatTableDataSource(this.studentApplicationList);
        } else {
          this.noStudents = "No students found!";
          this.noStu = true;
          console.log("error while students details loading!");
        }
      })
    } else {
      console.log("Please select course and branch!");
    }
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
}
