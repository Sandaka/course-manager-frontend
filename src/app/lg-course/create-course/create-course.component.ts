import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

export interface SubjectDetail {
  position: number;
  name: string;
  id: number;
  instructor: string;
  instructorId: number;
}

const ELEMENT_DATA: SubjectDetail[] = [
  { position: 1, name: 'Applied Data Programming', id: 1, instructor: 'Prof. Lochandaka', instructorId: 1 },
  { position: 2, name: 'Software Architecture and Programming Models', id: 2, instructor: 'Prof. Prasad', instructorId: 2 },
  { position: 3, name: 'Software Quality Engineering', id: 3, instructor: 'Mr. Darshana Abhayakoon', instructorId: 3 },
  { position: 4, name: 'Agile Project Development', id: 4, instructor: 'Mrs. Ramani Jayasekara', instructorId: 4 },
  { position: 5, name: 'Applied Data Programming', id: 1, instructor: 'Prof. Lochandaka', instructorId: 1 },
  { position: 6, name: 'Software Architecture and Programming Models', id: 2, instructor: 'Prof. Prasad', instructorId: 2 },
  { position: 7, name: 'Software Quality Engineering', id: 3, instructor: 'Mr. Darshana Abhayakoon', instructorId: 3 },
  { position: 8, name: 'Agile Project Development', id: 4, instructor: 'Mrs. Ramani Jayasekara', instructorId: 4 },

];

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {

  createCourseForm!: FormGroup;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.createCourseForm = this.fb.group({
      courseYearsList: this.fb.array([]),
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

  displayedColumns: string[] = ['select', 'position', 'name', 'instructor'];
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
    console.log(this.selection);
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
     console.log(this.selection);
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  selectRow(row: SubjectDetail) {
    this.selection.toggle(row);
    console.log(this.selection.selected);
  }
}
