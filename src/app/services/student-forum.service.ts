import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostRegistrationStudent } from '../models/post-registration-student';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class StudentForumService {

  constructor(private http: HttpClient) { }

  saveQuestion(post: PostRegistrationStudent): Observable<object> {
    console.log("saving post...");
    return this.http.post(environment.baseURL + "/sts/question", post);
  }

  getAllPosts(): Observable<any> {
    return this.http.get<PostRegistrationStudent[]>(environment.baseURL + "/sts/questions");
  }
}
