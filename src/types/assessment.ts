
// Define question types
export type QuestionType = 'setup' | 'multipleChoice' | 'audio' | 'context' | 'wordFormation' | 'collocation';

// Define answer type
export type Answer = string | number | {
  answer: string;
  correct: boolean;
  difficulty: string;
}

// Option type for questions
export type QuestionOption = {
  value: string;
  label: string;
}

// Base question interface
export interface BaseQuestion {
  id: string;
  type: QuestionType;
  question: string;
}

// Setup question interface
export interface SetupQuestion extends BaseQuestion {
  type: 'setup';
  options?: QuestionOption[];
  isSlider?: boolean;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
}

// Assessment question interface
export interface AssessmentQuestion extends BaseQuestion {
  type: Exclude<QuestionType, 'setup'>;
  options: QuestionOption[];
  correctAnswer: string;
  difficulty: string;
  audioUrl?: string;
}

// Union type for all question types
export type Question = SetupQuestion | AssessmentQuestion;
