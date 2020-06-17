import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { Lesson } from "../../domain-model.intf";

@Component({
  selector: 'app-lesson',
  template: `
    <div class="lesson" *ngIf="lesson">
      <p>Lesson: {{lesson!.name}}</p>
      <p>Difficulty: {{lesson!.difficulty}}</p>
      <p *ngIf="canBeRemoved; else cannotRemove"><button type="button" (click)="remove()">Remove</button></p>
      <ng-template #cannotRemove>
        <p>You can't remove lessons</p>
      </ng-template>
    </div>
  `,
  styleUrls: ['./lesson.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonComponent implements OnInit, OnChanges {
  
  @Input()
  lesson: Lesson | null = null;

  @Input()
  canBeRemoved = false;

  @Output()
  removeRequested: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("lesson ngOnChanges", changes);
  }

  remove(): void {
    console.log("Asking to remove lesson");
    this.removeRequested.emit();
  }
}
