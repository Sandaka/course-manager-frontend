import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentForumService } from 'src/app/services/student-forum.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';

@Component({
  selector: 'app-ask-question-form',
  templateUrl: './ask-question-form.component.html',
  styleUrls: ['./ask-question-form.component.scss']
})
export class AskQuestionFormComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl('');
  filteredTags!: Observable<string[]>;
  tags: string[] = ['Java'];
  allTags: string[] = ['Spring boot', 'MySQL', 'Angular', 'React', 'AWS', 'Docker', 'Grafana'];

  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

  askQuestionForm!: FormGroup;

  constructor(private fb: FormBuilder, private studentForumService: StudentForumService, private _snackBar: MatSnackBar, private eventEmitterService: EventEmitterService) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice())),
    );
  }

  ngOnInit(): void {
    this.askQuestionForm = this.fb.group({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
      tagNames: new FormControl(''),
      smsUserId: new FormControl(sessionStorage.getItem('smsUserId')),
    })
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagCtrl.setValue(null);

  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);

    this.askQuestionForm.patchValue({
      tagNames: this.tags
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().includes(filterValue));
  }

  setStyle(style: string) {
    //let bool = document.execCommand(style, false);
  }

  postQuestion() {
    console.log(this.askQuestionForm.value)
    this.studentForumService.saveQuestion(this.askQuestionForm.value).subscribe(data => {
      console.log(data), (error: any) => console.log(error)
      if (data) {
        //this.showSuccessSnackbar("Your registration has been recorded!", 'close', '4000')
        console.log("success!")
        this.reloadPostsOnForum()
        this.showSuccessSnackbar("Your post will be published soon!", 'close', '4000')
      } else {
        //this.showErrorSnackbar("Something went wrong!", 'close', '4000');
        console.log("error!")
      }
    })
  }

  reloadPostsOnForum(){
    this.eventEmitterService.onLoadTheForum();
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
