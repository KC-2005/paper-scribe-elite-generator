
export type Subject = 'Physics' | 'Chemistry' | 'Biology' | 'Mathematics';
export type Grade = '11' | '12';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type BloomLevel = 'Knowledge' | 'Comprehension' | 'Application' | 'Analysis' | 'Synthesis' | 'Evaluation';

export interface Topic {
  id: string;
  name: string;
  subject: Subject;
  grade: Grade;
}

export interface Question {
  id: string;
  text: string;
  subject: Subject;
  grade: Grade;
  marks: number;
  difficulty: Difficulty;
  topic: string;
  bloomLevel: BloomLevel;
  answer?: string;
}

export interface PaperSettings {
  subject: Subject;
  grade: Grade;
  totalQuestions: number;
  totalMarks: number;
  difficultyDistribution: {
    easy: number;
    medium: number;
    hard: number;
  };
  selectedTopics: string[];
  includeAnswers: boolean;
  schoolName?: string;
  examTitle?: string;
  duration?: number;
}

export interface QuestionPaper {
  id: string;
  settings: PaperSettings;
  questions: Question[];
  createdAt: string;
}
