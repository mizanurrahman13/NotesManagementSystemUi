import { Component, OnInit } from '@angular/core';
import { CreateNoteModel, NoteType } from '../../models/create-note.model';

@Component({
  selector: 'app-note-list',
  standalone: false,
  
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css'
})
export class NoteListComponent implements OnInit {
  notes: CreateNoteModel[] = [
    { id: 1, text: 'Note 1', type: NoteType.Regular, reminder: "", dueDate: "", isComplete: false, url: '' },
    { id: 2, text: 'Note 2', type: NoteType.Reminder, reminder: new Date(), dueDate: "", isComplete: false, url: '' },
    { id: 3, text: 'Note 3', type: NoteType.Todo, reminder: "", dueDate: new Date(), isComplete: false, url: '' },
    { id: 4, text: 'Note 4', type: NoteType.Bookmark, reminder: "", dueDate: "", isComplete: false, url: 'https://example.com' }
  ];
  currentPage = 1;
  itemsPerPage = 2;
  totalPages!: number;

  ngOnInit(): void {
    this.totalPages = Math.ceil(this.notes.length / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get paginatedNotes(): CreateNoteModel[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.notes.slice(startIndex, endIndex);
  }

  getNoteTypeClass(noteType: NoteType): string {
    switch (noteType) {
      case NoteType.Regular:
        return 'bg-gray-100';
      case NoteType.Reminder:
        return 'bg-yellow-100';
      case NoteType.Todo:
        return 'bg-green-100';
      case NoteType.Bookmark:
        return 'bg-blue-100';
      default:
        return '';
    }
  }

  editNote(id: number): void {
    console.log(`Edit note with ID: ${id}`);
    // Implement the logic to edit the note
  }
}


