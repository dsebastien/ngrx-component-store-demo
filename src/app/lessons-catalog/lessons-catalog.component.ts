import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {LessonsCatalogComponentStore} from "./lessons-catalog-component-store.service";
import {LessonDifficulty} from "../domain-model.intf";
import {LessonsCatalogState} from "./lessons-catalog-state.intf";

const INITIAL_DEMO_STATE: LessonsCatalogState = {
  instructors: {
    "i1": {
      id: "i1",
      firstName: "Sébastien",
      givenName: "Dubois",
    },
    "i2": {
      id: "i2",
      firstName: "foo",
      givenName: "bar",
    },
  },
  lessons: {
    "l1": {
      id: "l1",
      name: "NGRX 101",
      difficulty: LessonDifficulty.MEDIUM,
    },
    "l2": {
      id: "l2",
      name: "TypeScript for Beginners",
      difficulty: LessonDifficulty.EASY,
    },
  },
  // Let's imagine that the current user can't do everything
  // based on his current access level, at this specific moment
  canAddLessons: false,
  canAddInstructors: false,
  canRemoveLessons: false,
  canRemoveInstructors: true,
};

@Component({
  selector: 'app-lessons-catalog',
  templateUrl: './lessons-catalog.component.html',
  styleUrls: ['./lessons-catalog.component.scss'],
  providers: [LessonsCatalogComponentStore], // Will be created with this component and will be destroyed when this component is destroyed; so its lifecycle is tied to this component.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonsCatalogComponent implements OnInit {
  @Input()
  name = "";

  // That state and the business logic is not needed here:
  // it has been extracted to the LessonsCatalogComponentStore
  //lessons: Record<string, Lesson>;
  //instructors: Record<string, Instructor>;
  //canAddInstructors: boolean;
  //canAddLessons: boolean;
  //...

  // don't worry about this
  private counter = 0;

  constructor(private lessonsCatalogStore: LessonsCatalogComponentStore) {
    console.log("Lesson catalog initialized", lessonsCatalogStore);
  }

  ngOnInit() {
    // Set the state (there are multiple alternatives to do this)
    this.lessonsCatalogStore.setState(INITIAL_DEMO_STATE);
  }

  addInstructor(): void {
    console.log("Adding instructor");
    this.counter += 1;
    this.lessonsCatalogStore.addInstructor({
      id: `instructor-${this.counter}`,
      firstName: `Foo `,
      givenName: `Mario`,
    });
  }

  addLesson(): void {
    console.log("Adding lesson");
    this.counter += 1;
    this.lessonsCatalogStore.addLesson({
      id: `lesson-${this.counter}`,
      name: `CS ${this.counter}`,
      difficulty: LessonDifficulty.HARD,
    })
  }

  resetDemo(): void {
    console.log("Resetting demo");
    this.lessonsCatalogStore.setState(INITIAL_DEMO_STATE);
  }

}
