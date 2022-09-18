import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course';
import { CourseFeeDto } from 'src/app/models/course-fee';
import { CourseYearFeeDto } from 'src/app/models/course-year-fee';
import { CourseYearFeeList } from 'src/app/models/course-year-fee-list';
import { TempStudentDetails } from 'src/app/models/temp-student-details';
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

// export interface PeriodicElement {
//   course_name: string;
//   start_date: string;
//   end_date: string;
//   duration: string;
//   mode: string;
//   payment_plan: string;
//   schedule: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   { course_name: 'BSc (Computer Science)', start_date: '10/10/2022', end_date: '10/10/2026', duration: '3 Years', mode: 'Full time', payment_plan: 'Plan A', schedule: 'Monday to Friday | 8.00AM-2.00PM' },
//   { course_name: 'BSc (Computer Science)', start_date: '10/10/2022', end_date: '10/10/2026', duration: '3 Years', mode: 'Part time', payment_plan: 'Plan B', schedule: 'Saturday and Sunday | 8.00AM-5.00PM' },

// ];

@Component({
  selector: 'app-student-self-registration',
  templateUrl: './student-self-registration.component.html',
  styleUrls: ['./student-self-registration.component.scss']
})
export class StudentSelfRegistrationComponent implements OnInit {

  courseDetailList: CourseYearFeeDto[] = [];
  feeDetailList: CourseFeeDto[] = [];
  courseFee: string = "";
  offer: string = "";

  displayedColumns: string[] = ['course_name', 'start_date', 'end_date', 'duration', 'mode', 'schedule', 'seats'];
  //dataSource = ELEMENT_DATA;
  dataSource_course: MatTableDataSource<CourseYearFeeDto> = new MatTableDataSource<CourseYearFeeDto>([]);
  dataSource_fee: MatTableDataSource<CourseFeeDto> = new MatTableDataSource<CourseFeeDto>([]);

  // data = [
  //   { state: 'Year 1', county: '100,000.00', item: '01-03-2022' },
  //   { state: 'Year 1', county: '200,000.00', item: '01-09-2022' },
  //   { state: 'Year 2', county: '100,000.00', item: 0.04 },
  //   { state: 'Year 3', county: '100,000.00', item: 0.14 },
  //   // { state: 'CA', county: '2', item: 0.019 },
  //   // { state: 'MN', county: '1', item: 0.0374 }, 
  //   // { state: 'CA', county: '2', item: 0.037 },
  //   // { state: 'CA', county: '3', item: 0.14 }
  // ];

  dataExt: any[] = [];

  courseModes = [
    { id: 1, courseTypeName: 'Full time' },
    { id: 2, courseTypeName: 'Part time' }
  ];
  //paymentModes: string[] = ['Full time', 'Part time'];

  tempStudentDetailsForm!: FormGroup;
  courseProviderId: string = '';
  courseList: Course[] = [];

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, private studentService: StudentService, private courseService: CourseService, private _snackBar: MatSnackBar) {
    // this.processData();
  }

  ngOnInit(): void {

    this.loadCourseByCourseProvider();

    this.tempStudentDetailsForm = this.fb.group({
      //firstName: new FormControl('', Validators.required),
      //lastName: new FormControl('', Validators.required),
      fullName: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      telephone1: new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]+')]),
      telephone2: new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]+')]),
      addressLine1: new FormControl('', Validators.required),
      addressLine2: new FormControl('', Validators.required),
      addressLine3: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      nationality: new FormControl('', Validators.required),
      civilStatus: new FormControl('', Validators.required),
      //jobSector: new FormControl('', Validators.required),
      // subSectorId: new FormControl('', Validators.required),
      // jobTitle: new FormControl('', Validators.required),
      nic: new FormControl('', Validators.required),
      description: new FormControl(''),
      courseId: new FormControl(''),
      branchId: new FormControl(''),
      courseTypeId: new FormControl(''),
      // imageUrl: new FormControl(''),
      // loggedInUserId: new FormControl(''),
      // userId: new FormControl(1),
      //     pokemonControl: new FormControl(''),
      // toppings: new FormControl(''),
      educationalQualificationList: this.fb.array([]),
      //professionalQualificationList: this.fb.array([]),
    });

    this.addEducation();
    // this.addQualification();

    
  }

  get educationalQualificationList(): FormArray {
    return this.tempStudentDetailsForm.get('educationalQualificationList') as FormArray;
  }

  // get professionalQualificationList(): FormArray {
  //   return this.tempStudentDetailsForm.get('professionalQualificationList') as FormArray;
  // }

  addEducation() {
    this.educationalQualificationList.push(this.newEducation());
  }

  // addQualification() {
  //   this.professionalQualificationList.push(this.newQualification());
  // }

  newEducation(): FormGroup {
    return this.fb.group({
      qualificationTypeId: new FormControl('', Validators.required),
      school: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      effectiveDate: new FormControl('', Validators.required),
      qualificationName: new FormControl('', Validators.required),
      overallGrade: new FormControl('', Validators.required)
    })
  }

  newQualification(): FormGroup {
    return this.fb.group({
      qualificationName: new FormControl(''),
      pqInstituteName: new FormControl(''),
      pqGrade: new FormControl('')
    })
  }

  removeEducation(eduIndex: number) {
    this.educationalQualificationList.removeAt(eduIndex);
  }


  // removeQualification(pqIndex: number) {
  //   this.professionalQualificationList.removeAt(pqIndex);
  // }

  // courseId = new FormControl('');
  // branchId = new FormControl('');
  branchList = [
    { id: 1, branchName: 'Colombo' },
    { id: 2, branchName: 'Horana' }
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

  // private processData() {
  //   const statesSeen: any = {};
  //   const countiesSeen: any = {};

  //   this.dataExt = this.data.sort((a, b) => {
  //     const stateComp = a.state.localeCompare(b.state);
  //     return stateComp ? stateComp : a.county.localeCompare(b.county);
  //   }).map(x => {
  //     const stateSpan = statesSeen[x.state] ? 0 :
  //       this.data.filter(y => y.state === x.state).length;

  //     statesSeen[x.state] = true;

  //     const countySpan = countiesSeen[x.state] && countiesSeen[x.state][x.county] ? 0 :
  //       this.data.filter(y => y.state === x.state && y.county === x.county).length;

  //     countiesSeen[x.state] = countiesSeen[x.state] || {};
  //     countiesSeen[x.state][x.county] = true;

  //     return { ...x, stateSpan, countySpan };
  //   });
  // }


  loadCourseDetails() {
    let courseId: string = this.tempStudentDetailsForm.controls['courseId'].value
    console.log(courseId);
    if (courseId === '' || courseId === undefined) {
      console.log("Please select the course first!")
    } else {
      console.log("Course id found!")
      this.courseService.getCourseDetailsForStudent(courseId).subscribe(data => {
        let courseYearFeeList: CourseYearFeeList = data;

        this.courseDetailList = courseYearFeeList.courseDetailsList;
        this.feeDetailList = courseYearFeeList.courseFeeList;

        this.courseFee = this.courseDetailList[0].courseFee;
        this.offer = this.courseDetailList[0].offer;

        this.dataSource_course = new MatTableDataSource(courseYearFeeList.courseDetailsList);
        this.dataSource_fee = new MatTableDataSource(courseYearFeeList.courseFeeList);
      })
    }
  }

  loadCourseByCourseProvider() {
    console.log("aaaaa")
    this.activatedRoute.params.subscribe(data => {
      this.courseProviderId = data.id
      
    })
    console.log("Course provider " + this.courseProviderId);

    if (this.courseProviderId) {
      this.courseService.getCoursesByCpId(this.courseProviderId).subscribe(data => {
        console.log(data), (error: any) => console.log(error)
        if (data) {
          this.courseList = data;
        }
      })
    }
  }

  submitStudent(tempStudent: TempStudentDetails) {
    console.log(tempStudent);
    this.studentService.saveTempStudent(this.tempStudentDetailsForm.value).subscribe(data => {
      console.log(data), (error: any) => console.log(error)
      if (data) {
        this.showSuccessSnackbar("Your registration has been recorded!", 'close', '4000')
      } else {
        this.showErrorSnackbar("Something went wrong!", 'close', '4000');
      }
    })
  }


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
