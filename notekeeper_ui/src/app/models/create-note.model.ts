export interface CreateNoteModel {
    id: number;
    text: string;
    type: NoteType;
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
  