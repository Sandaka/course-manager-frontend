import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseProviderDetails } from '../models/course-provider-details';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class CourseProviderService {

  constructor(private http: HttpClient) { }

  registerCourseProvider(courseProvider: CourseProviderDetails): Observable<Object> {
    console.log("saving cp...");
    return this.http.post(environment.baseURL + "/cps/course-provider", courseProvider);
  }

  testMethod(): Observable<any>{
    console.log("test cp...");
    return this.http.get(environment.baseURL + "/cps/course-provider");
  }
}
