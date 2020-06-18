import {Lesson} from "../domain-model.intf";

export interface LessonsCatalogState {
    lessons: Record<string, Lesson>;
    canAddLessons: boolean;
    canRemoveLessons: boolean;
}
