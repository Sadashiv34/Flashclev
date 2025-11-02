
export interface BookDetails {
  title: string;
  author: string;
  coverImageUrl: string;
  chapters: string[];
}

export type MessageSender = 'user' | 'ai';

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string;
}

// Type definition for Vite environment variables
interface ImportMeta {
  env: {
    VITE_API_KEY?: string;
  };
}
