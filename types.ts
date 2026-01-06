
export enum UserRole {
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
  email: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  image: string;
}

export interface Class {
  id: string;
  name: string;
  subject: string;
  code: string;
  studentCount: number;
  createdAt: string;
}
