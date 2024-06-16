// src/types.ts
export interface Post {
    userId: number; // This property is required in the Post type
    id: number;
    title: string;
    body: string;
  }
  
  export interface Comment {
    id: number;
    postId: number;
    name: string;
    email: string;
    body: string;
  }