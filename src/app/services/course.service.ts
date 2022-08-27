import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseYearFeeList } from '../models/course-year-fee-list';
import { CreateCourseDetails } from '../models/create-course-details';
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
}
