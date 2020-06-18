export interface Lesson {
  id: string;
  name: string;
  difficulty: LessonDifficulty;
}

export enum LessonDifficulty {
  EASY = "Easy",
  MEDIUM = "Medium",
  HARD = "Hard",
}
