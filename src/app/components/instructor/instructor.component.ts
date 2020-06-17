import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {Instructor} from "../../domain-model.intf";

@Component({
  selector: 'app-instructor',
  template: `
    <div class="instructor" *ngIf="instructor">
      <p>First name: {{instructor.firstName}}</p>
      <p>Given name: {{instructor.givenName}}</p>
      <p *ngIf="canBeRemoved; else cannotRemove"><button type="button" (click)="remove()">Remove</button></p>
      <ng-template #cannotRemove>
        <p>You can't remove instructors</p>
      </ng-template>
    </div>
  `,
  styleUrls: ['./instructor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstructorComponent implements OnInit, OnChanges {
  
  @Input()
  instructor: Instructor | null = null;

  @Input()
  canBeRemoved = false;

  @Output()
  removeRequested: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("instructor ngOnChanges", changes);
  }

  remove(): void {
    console.log("Asking to remove instructor");
    this.removeRequested.emit();
  }
}
