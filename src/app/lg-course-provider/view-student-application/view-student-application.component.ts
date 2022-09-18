import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VerifyStudentApplication } from 'src/app/models/verify-student-application';
import { StudentService } from 'src/app/services/student.service';

export type DialogDataSubmitCallback<T> = (row: T) => void;

@Component({
  selector: 'app-view-student-application',
  templateUrl: './view-student-application.component.html',
  styleUrls: ['./view-student-application.component.scss']
})
export class ViewStudentApplicationComponent implements OnInit {

  verifyApplicationsForm!: FormGroup;
  studentApplication!: VerifyStudentApplication;

  constructor(private fb: FormBuilder, private studentService: StudentService, private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public data: { callback: DialogDataSubmitCallback<any>; defaultValue: VerifyStudentApplication },
    private dialogRef: MatDialogRef<ViewStudentApplicationComponent>
  ) { }

  ngOnInit(): void {

    this.verifyApplicationsForm = this.fb.group({
      tempStudentId: new FormControl('', Validators.required),
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      nationality: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      nic: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      submittedDate: new FormControl('', Validators.required),
      courseId: new FormControl('', Validators.required),
      highestQualification: new FormControl('', Validators.required),
      qualificationTypeName: new FormControl('', Validators.required),
      school: new FormControl('', Validators.required),
      overallGrade: new FormControl('', Validators.required),
      effectiveDate: new FormControl('', Validators.required),
      status: new FormControl(0, Validators.required),
    })

    if (this.data.defaultValue) {
      this.studentApplication = this.data.defaultValue;
      this.patchValuesOnForm(this.studentApplication);
    }

  }

  patchValuesOnForm(studentApplication: VerifyStudentApplication) {
    this.verifyApplicationsForm.patchValue({
      tempStudentId: studentApplication.tempStudentId,
      fullName: studentApplication.fullName,
      email: studentApplication.email,
      nationality: studentApplication.nationality,
      telephone: studentApplication.telephone,
      nic: studentApplication.nic,
      gender: studentApplication.gender,
      submittedDate: studentApplication.createdDate,
      courseId: studentApplication.courseId,
      highestQualification: studentApplication.qualificationName,
      qualificationTypeName: studentApplication.qualificationTypeName,
      school: studentApplication.school,
      overallGrade: studentApplication.overallGrade,
      effectiveDate: studentApplication.effectiveDate,
      status: 1
    });
  }

  verifyApplication() {
    console.log(this.verifyApplicationsForm.value);
    this.studentService.updateTempStudentStatus(this.verifyApplicationsForm.value).subscribe(data => {
      console.log(data), (error: any) => console.log(error)
      if (data) {
        this.showSuccessSnackbar("Application verified!", 'close', '4000')
      } else {
        this.showErrorSnackbar("Something went wrong!", 'close', '4000');
      }
      
    })
    this.showSuccessSnackbar("Application verified!", 'close', '4000')
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
