import {ComponentStore} from '@ngrx/component-store';
import {LessonsCatalogState} from "./lessons-catalog-state.intf";
import {Injectable} from "@angular/core";
import {Lesson, LessonDifficulty} from "../domain-model.intf";
import {Observable} from "rxjs";
import {delay, switchMap, tap} from "rxjs/operators";

const DEFAULT_STATE: LessonsCatalogState = {
    lessons: {},
    canAddLessons: false,
    canRemoveLessons: false,
    loading: false,
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
    readonly selectCanAddLessons = this.select(state => {
        console.log("Can add lessons: ", state.canAddLessons);
        return state.canAddLessons;
    });

    readonly selectCanRemoveLessons = this.select(state => {
        console.log("Can remove lessons: ", state.canRemoveLessons);
        return state.canRemoveLessons;
    });

    readonly selectLessons = this.select(state => {
        return Object.values(state.lessons);
    });

    /**
     * Combine selectors to make more advanced projections
     */
    readonly selectLessonsCount = this.select(
        this.selectLessons,
        lessons => lessons.length
    );

    readonly selectLoading = this.select(state => {
        return state.loading;
    });

    /**
     * Adds or replaces a lesson (this is a reducer)
     */
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

    readonly setLoading = this.updater(
        (state: LessonsCatalogState, newLoadingState: boolean) => {
            return {
                ...state,
                loading: newLoadingState,
            };
        }
    );

    readonly loadLessons = this.effect(
        (origin$: Observable<{ page: number; offset: number; itemsPerPage: number; }>) =>
            origin$.pipe(
                tap(() => this.setLoading(true)),
                switchMap((pageParameters) => {
                    console.log("Loading some lessons. Parameters: ", pageParameters);
                    // trigger async operation (let's imagine)
                    const dummyDate = new Date();
                    const retVal: Lesson[] = [
                        {
                            id: `loadedLesson-${dummyDate}-1`,
                            name: `Dummy loaded lesson ${dummyDate} 1`,
                            difficulty: LessonDifficulty.EASY,
                        },
                        {
                            id: `loadedLesson-${dummyDate}-2`,
                            name: `Dummy loaded lesson ${dummyDate} 2`,
                            difficulty: LessonDifficulty.EASY,
                        },
                    ];
                    return retVal;
                }),
                delay(500),
                tap((loadedLesson) => {
                    console.log("Loaded lessons. Adding it to the state: ", loadedLesson);
                    this.addLesson(loadedLesson);
                    this.setLoading(false);
                }),
            ));
}
