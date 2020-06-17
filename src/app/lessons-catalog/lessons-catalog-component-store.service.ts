import { ComponentStore } from '@ngrx/component-store';
import { LessonsCatalogState } from "./lessons-catalog-view-model.intf";
import {Injectable} from "@angular/core";
import {Instructor, Lesson} from "../domain-model.intf";

const DEFAULT_STATE: LessonsCatalogState = {
    lessons: {},
    instructors: {},
    canAddInstructors: false,
    canRemoveInstructors: false,
    canAddLessons: false,
    canRemoveLessons: false,
};

@Injectable()
export class LessonsCatalogComponentStore extends ComponentStore<LessonsCatalogState> {
    constructor() {
        // initial state
        super(DEFAULT_STATE);
    }

    /**
     * Selectors
     */
    readonly selectCanAddInstructors = this.select(state => {
        console.log("Can add instructors: ", state.canAddInstructors);
        return state.canAddInstructors;
    });

    readonly selectCanAddLessons = this.select(state => {
        console.log("Can add lessons: ", state.canAddLessons);
        return state.canAddLessons;
    });

    readonly selectCanRemoveInstructors = this.select(state => {
        console.log("Can remove instructors: ", state.canRemoveInstructors);
        return state.canRemoveInstructors;
    });

    readonly selectCanRemoveLessons = this.select(state => {
        console.log("Can remove lessons: ", state.canRemoveLessons);
        return state.canRemoveLessons;
    });

    readonly selectInstructors = this.select(state => {
        return Object.values(state.instructors);
    });

    readonly selectLessons = this.select(state => {
        return Object.values(state.lessons);
    });

    /**
     * Combine selectors to make more advanced projections
     */
    readonly selectInstructorsCount = this.select(
        this.selectInstructors,
        instructors => instructors.length
    );

    readonly selectLessonsCount = this.select(
        this.selectLessons,
        lessons => lessons.length
    );

    /**
     * Adds or replaces an instructor (this is a reducer)
     */
    readonly addInstructor = this.updater(
        (state: LessonsCatalogState, instructor: Instructor) => {
            const newInstructorsMap = Object.assign({}, state.instructors);
            newInstructorsMap[instructor.id] = instructor;
            return {
                ...state,
                instructors: newInstructorsMap,
            };
        }
    );

    readonly addLesson = this.updater(
        (state: LessonsCatalogState, lesson: Lesson) => {
            const newLessonsMap = Object.assign({}, state.lessons);
            newLessonsMap[lesson.id] = lesson;
            return {
                ...state,
                lessons: newLessonsMap,
            };
        }
    );

    readonly allowAddingLessons = this.updater(
        (state: LessonsCatalogState) => {
            return {
                ...state,
                canAddLessons: true,
            };
        }
    );

    readonly denyAddingLessons = this.updater(
        (state: LessonsCatalogState) => {
            return {
                ...state,
                canAddLessons: false,
            };
        }
    );

    readonly allowAddingInstructors = this.updater(
        (state: LessonsCatalogState) => {
            return {
                ...state,
                canAddInstructors: true,
            };
        }
    );

    readonly denyAddingInstructors = this.updater(
        (state: LessonsCatalogState) => {
            return {
                ...state,
                canAddInstructors: false,
            };
        }
    );

    readonly allowRemovingLessons = this.updater(
        (state: LessonsCatalogState) => {
            return {
                ...state,
                canRemoveLessons: true,
            };
        }
    );

    readonly denyRemovingLessons = this.updater(
        (state: LessonsCatalogState) => {
            return {
                ...state,
                canRemoveLessons: false,
            };
        }
    );

    readonly allowRemovingInstructors = this.updater(
        (state: LessonsCatalogState) => {
            return {
                ...state,
                canRemoveInstructors: true,
            };
        }
    );

    readonly denyRemovingInstructors = this.updater(
        (state: LessonsCatalogState) => {
            return {
                ...state,
                canRemoveInstructors: false,
            };
        }
    );

    readonly removeInstructor = this.updater(
        (state: LessonsCatalogState, instructorToRemove: Instructor) => {
            const newInstructorsMap = Object.assign({}, state.instructors);
            delete newInstructorsMap[instructorToRemove.id];
            return {
                ...state,
                instructors: newInstructorsMap,
            };
        }
    );

    readonly removeLesson = this.updater(
        (state: LessonsCatalogState, lessonToRemove: Lesson) => {
            const newLessonsMap = Object.assign({}, state.lessons);
            delete newLessonsMap[lessonToRemove.id];
            return {
                ...state,
                lessons: newLessonsMap,
            };
        }
    );

    // TODO add example effects

    // // Effect example
    // readonly saveAuthor = this.effect<Author>(
    //     // every time `saveAuthor` is called, its argument
    //     // is emitted into author$ Observable.
    //     author$ => author$.pipe(
    //         // calls private reducer to set state to SAVING
    //         tap(author => this.savingAuthor(author)),
    //         // allows to choose flattening strategy and
    //         // calls API.
    //         concatMap(author => this.api.saveAuthor(author)),
    //         // calls private reducer to set state to SAVED
    //         tap((author: Author) => this.saveAuthorSuccess(author)),
    //     )
    // );
    //
}
