import {Instructor, Lesson} from "../domain-model.intf";

export interface LessonsCatalogState {
    lessons: Record<string, Lesson>;
    instructors: Record<string, Instructor>;
    canAddInstructors: boolean;
    canAddLessons: boolean;
    canRemoveInstructors: boolean;
    canRemoveLessons: boolean;
}
