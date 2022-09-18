import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostRegistrationStudent } from 'src/app/models/post-registration-student';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { StudentForumService } from 'src/app/services/student-forum.service';
import { AskQuestionFormComponent } from '../ask-question-form/ask-question-form.component';

@Component({
  selector: 'app-student-forum',
  templateUrl: './student-forum.component.html',
  styleUrls: ['./student-forum.component.scss']
})
export class StudentForumComponent implements OnInit {

  postsList: PostRegistrationStudent[] = [];

  constructor(public dialog: MatDialog, private studentForumService: StudentForumService, private eventEmitterService: EventEmitterService) { }

  ngOnInit(): void {
    if (this.eventEmitterService.subsVar == undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.invokeLoadPostsFucntion.subscribe(() => {
        this.loadPosts();
      })
    }
    this.loadPosts();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AskQuestionFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  loadPosts() {
    this.studentForumService.getAllPosts().subscribe(data => {
      this.postsList = data;
    })
  }
}
