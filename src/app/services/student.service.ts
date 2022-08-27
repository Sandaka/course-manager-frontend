import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TempStudentDetails } from '../models/temp-student-details';
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
}
