import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { CourseYearFeeList } from '../models/course-year-fee-list';
import { CreateCourseDetails } from '../models/create-course-details';
import { TempStudentCourseDetail } from '../models/tempstudent-coursedetail';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  saveCourse(courseDetail: CreateCourseDetails): Observable<Object> {
    console.log("saving course...");
    return this.http.post(environment.baseURL + "/cps/course", courseDetail);
  }

  getCourseDetailsForStudent(courseId: any): Observable<any> {
    return this.http.get<CourseYearFeeList>(environment.baseURL + "/cps/courseStudent/" + courseId);
  }

  getCoursesByCpId(cpid: any): Observable<any> {
    return this.http.get<Course[]>(environment.baseURL + "/cps/get_courses_by_cpid/" + cpid);
  }

  getCoursesBySmsAccountId(smsAccountId: any): Observable<any> {
    return this.http.get<Course[]>(environment.baseURL + "/cps/get_course_by_smsaccount_id/" + smsAccountId);
  }

  getCoursesByTempStudentId(studentId: any): Observable<TempStudentCourseDetail> {
    return this.http.get<TempStudentCourseDetail>(environment.baseURL + "/cps/course_detail/" + studentId);
  }
}
