import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TempStudentDetails } from '../models/temp-student-details';
import { TempStudentCourseDetail } from '../models/tempstudent-coursedetail';
import { VerifyStudentApplication } from '../models/verify-student-application';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  saveTempStudent(tempStudent: TempStudentDetails): Observable<Object> {
    console.log("saving temp student...");
    return this.http.post(environment.baseURL + "/cps/temp_student", tempStudent);
  }

  loadCourses(courseProviderId: string): Observable<any> {
    return this.http.get(environment.baseURL + "/cps/temp_student" + courseProviderId);
  }

  getNewStudentsByCourseAndBranchId(courseId: any, branchId: any): Observable<any> {
    return this.http.get(environment.baseURL + "/cps/applications?courseId=" + courseId + "&branchId=" + branchId);
  }

  getPaidStudentsByCourseAndBranchId(courseId: any, branchId: any): Observable<any> {
    return this.http.get(environment.baseURL + "/cps/applications_payment?courseId=" + courseId + "&branchId=" + branchId);
  }

  verifyAndEnrollStudent(enrollment: VerifyStudentApplication): Observable<Object> {
    console.log("save enrollments..." + enrollment.username);
    return this.http.post(environment.baseURL + "/cps/verify_payment", enrollment);
  }

  updateTempStudentStatus(studentApplication: VerifyStudentApplication): Observable<Object> {
    return this.http.post(environment.baseURL + "/cps/verify_application", studentApplication);
  }

  updatePaymentTempStudentStatus(tempStudentCourseDetail: TempStudentCourseDetail): Observable<Object> {
    return this.http.post(environment.baseURL + "/cps/reg_payment" , tempStudentCourseDetail);
  }
}
