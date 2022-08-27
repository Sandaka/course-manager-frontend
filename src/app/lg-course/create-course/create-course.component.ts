import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { CreateCourseDetails } from 'src/app/models/create-course-details';
import { CourseService } from 'src/app/services/course.service';

export interface SubjectDetail {
  //position: number;
  name: string;
  id: number;
  instructor: string;
  instructorId: number;
}

const ELEMENT_DATA: SubjectDetail[] = [
  { name: 'Applied Data Programming', id: 1, instructor: 'Prof. Lochandaka', instructorId: 1 },
  { name: 'Software Architecture and Programming Models', id: 2, instructor: 'Prof. Prasad', instructorId: 2 },
  { name: 'Software Quality Engineering', id: 3, instructor: 'Mr. Darshana Abhayakoon', instructorId: 3 },
  { name: 'Agile Project Development', id: 4, instructor: 'Mrs. Ramani Jayasekara', instructorId: 4 },
  { name: 'Applied Data Programming', id: 1, instructor: 'Prof. Lochandaka', instructorId: 1 },
  { name: 'Software Architecture and Programming Models', id: 2, instructor: 'Prof. Prasad', instructorId: 2 },
  { name: 'Software Quality Engineering', id: 3, instructor: 'Mr. Darshana Abhayakoon', instructorId: 3 },
  { name: 'Agile Project Development', id: 4, instructor: 'Mrs. Ramani Jayasekara', instructorId: 4 },

];

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {

  createCourseForm!: FormGroup;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private courseService: CourseService) {

  }

  ngOnInit(): void {
    this.createCourseForm = this.fb.group({
      courseYearsList: this.fb.array([]),
      courseName: new FormControl('', Validators.required),
      years: new FormControl('', Validators.required),
      courseTypeId: new FormControl('', Validators.required),
      eduLevelId: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      lectureDate: new FormControl('', Validators.required),
      lectureTime: new FormControl('', Validators.required),
      seats: new FormControl(''),
      medium: new FormControl('', Validators.required),
      courseFee: new FormControl('', Validators.required),
      offer: new FormControl(''),
      validUntil: new FormControl(''),
      offerDescription: new FormControl(''),
      description: new FormControl(''),
      subjectList: new FormControl(''),
    });

    this.addEducation();

  }

  get courseYearsList(): FormArray {
    return this.createCourseForm.get('courseYearsList') as FormArray;
  }

  addEducation() {
    this.courseYearsList.push(this.newEducation());
  }

  removeEducation(eduIndex: number) {
    this.courseYearsList.removeAt(eduIndex);
  }

  newEducation(): FormGroup {
    return this.fb.group({
      year: new FormControl('', Validators.required),
      fee: new FormControl('', Validators.required),
      dueDate: new FormControl('', Validators.required),

    })
  }

  displayedColumns: string[] = ['select', 'id', 'name', 'instructor'];
  dataSource = new MatTableDataSource<SubjectDetail>(ELEMENT_DATA);
  selection = new SelectionModel<SubjectDetail>(true, []);

  // /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  // /** Selects all rows if they are not all selected; otherwise clear selection. */
  // toggleAllRows() {
  //   if (this.isAllSelected()) {
  //     this.selection.clear();
  //     return;
  //   }

  //   this.selection.select(...this.dataSource.data);
  // }

  // /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: SubjectDetail): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  // }

  isAllSelected() {
    //console.log(this.selection);
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    //console.log(this.selection);
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  selectRow(row: SubjectDetail) {
    this.selection.toggle(row);
    console.log(this.selection.selected);
    this.createCourseForm.patchValue({
      subjectList: this.selection.selected,
    })
  }

  saveCourse(courseDetails: CreateCourseDetails) {
    console.log(courseDetails)
    this.courseService.saveCourse(courseDetails).subscribe(data => {
      console.log(data), (error: any) => console.log(error)
      if (data) {
        this.showSuccessSnackbar("Your course created successfully!", 'close', '4000')
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
