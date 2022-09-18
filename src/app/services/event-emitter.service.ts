import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeLoadPostsFucntion = new EventEmitter();
  subsVar!: Subscription;

  constructor() { }

  onLoadTheForum() {
    this.invokeLoadPostsFucntion.emit();
  }
}
