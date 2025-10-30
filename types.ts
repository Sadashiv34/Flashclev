export enum Page {
  Landing,
  Search,
  Suggestions,
  Book,
}

export enum BookSubPage {
  Reading,
  DeepUnderstanding,
  WriteOwnWords,
}

export interface Book {
  title: string;
  author: string;
  isbn: string;
  description: string;
  keyTakeaways: string[];
  outcomes: string[];
  coverImageUrl?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}