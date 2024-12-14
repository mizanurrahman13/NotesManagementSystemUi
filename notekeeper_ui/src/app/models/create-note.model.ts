export interface CreateNoteModelList {
    id: number;
    text: string;
    type: NoteType;
    reminder?: Date | "";
    dueDate?: Date | "";
    isComplete: boolean;
    url: string;
  }

  export interface CreateNoteModel {
    text: string;
    type: NoteType2;
    reminder?: Date | "";
    dueDate?: Date | "";
    isComplete: boolean;
    url: string;
  }

  export interface UpdateNoteModel {
    id: number,
    text: string;
    type: NoteType2;
    reminder?: Date | "";
    dueDate?: Date | "";
    isComplete: boolean;
    url: string;
  }
  
  export enum NoteType {
    Regular = 'Regular',
    Reminder = 'Reminder',
    Todo = 'Todo',
    Bookmark = 'Bookmark'
  }

  export enum NoteType2 {
    Regular = 0,
    Reminder = 1,
    Todo = 2,
    Bookmark = 3,
  }
  