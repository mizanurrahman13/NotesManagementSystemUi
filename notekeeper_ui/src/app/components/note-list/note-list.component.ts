// import { Component, OnInit } from '@angular/core';
// import { NoteService } from '../../services/note/note.service';

// @Component({
//   selector: 'app-note-list',
//   standalone: false,
//   templateUrl: './note-list.component.html',
//   styleUrls: ['./note-list.component.css']
// })
// export class NoteListComponent implements OnInit {
//   notes: any[] = [];
//   currentPage: number = 1;
//   itemsPerPage: number = 5;
//   totalPages: number = 1;
//   paginatedNotes: any[] = [];

//   constructor(private noteService: NoteService) {}

//   ngOnInit(): void {
//     this.fetchDashboardNotes();
//   }

//   fetchDashboardNotes(): void {
//     this.noteService.getDashboardNotes().subscribe(
//       response => {
//         if (response && Array.isArray(response)) {
//           this.notes = response;
//           this.totalPages = Math.ceil(this.notes.length / this.itemsPerPage);
//           this.paginateNotes();
//           console.log('Fetched Dashboard Notes:', this.notes);
//         } else {
//           console.error('Unexpected response format:', response);
//           this.notes = [];
//         }
//       },
//       error => {
//         console.error('Error fetching dashboard notes', error);
//         this.notes = [];
//       }
//     );
//   }

//   paginateNotes(): void {
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     const endIndex = startIndex + this.itemsPerPage;
//     this.paginatedNotes = this.notes.slice(startIndex, endIndex);
//   }

//   changePage(page: number): void {
//     if (page < 1 || page > this.totalPages) return;
//     this.currentPage = page;
//     this.paginateNotes();
//   }

//   getNoteTypeClass(type: number): string {
//     // Return a class based on the note type for styling
//     return '';
//   }

//   editNote(noteId: number): void {
//     // Implement the edit functionality
//     console.log(noteId);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { NoteType, UpdateNoteModel } from '../../models/create-note.model';
import { NoteService } from '../../services/note/note.service';

@Component({
  selector: 'app-note-list',
  standalone: false,
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  notes: UpdateNoteModel[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  paginatedNotes: UpdateNoteModel[] = [];
  selectedNote: UpdateNoteModel | null = null;
  noteForm: any;

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.fetchDashboardNotes();
  }

  fetchDashboardNotes(): void {
    this.noteService.getDashboardNotes().subscribe(
      response => {
        if (response && Array.isArray(response)) {
          this.notes = response;
          this.totalPages = Math.ceil(this.notes.length / this.itemsPerPage);
          this.paginateNotes();
          console.log('Fetched Dashboard Notes:', this.notes);
        } else {
          console.error('Unexpected response format:', response);
          this.notes = [];
        }
      },
      error => {
        console.error('Error fetching dashboard notes', error);
        this.notes = [];
      }
    );
  }

  paginateNotes(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedNotes = this.notes.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.paginateNotes();
  }

  getNoteTypeClass(type: number): string {
    switch (type) { 
      case 0: return 'grew'; 
      case 1: return 'blue'; 
      case 2: return 'green'; 
      case 3: return 'yellow'; 
      default: return ''; }
  }

  editNote(note: UpdateNoteModel): void {
    this.selectedNote = { ...note }; // Clone the note to avoid direct mutation
    console.log('selected note', this.selectedNote);

    // Map note type string to corresponding numeric value
          const noteTypeMap: { [key: string]: number } = {
            [NoteType.Regular]: 0,
            [NoteType.Reminder]: 1,
            [NoteType.Todo]: 2,
            [NoteType.Bookmark]: 3
          };
    
          // Create the API note model with the correct type mapping
          const apiNote: UpdateNoteModel = {
            id: this.selectedNote.id,
            text: this.selectedNote.text,
            type: noteTypeMap[this.selectedNote.type], // Convert type string to number
            reminder: this.selectedNote.reminder,
            dueDate: this.selectedNote.dueDate,
            isComplete: this.selectedNote.isComplete,
            url: this.selectedNote.url
          };

          this.selectedNote = apiNote;
          console.log('modified note', this.selectedNote);
  }

  openEditModal(note: any) { 
    this.noteForm.patchValue(note); // Show the modal 
    const modalElement = document.getElementById('edit-note-modal'); 
    modalElement?.classList.remove('hidden'); 
  }

  onNoteUpdate(note: UpdateNoteModel | null): void {
    if (note) {
      // Map note type string to corresponding numeric value
      const noteTypeMap: { [key: string]: number } = {
        [NoteType.Regular]: 0,
        [NoteType.Reminder]: 1,
        [NoteType.Todo]: 2,
        [NoteType.Bookmark]: 3
      };

      // Create the API note model with the correct type mapping
      const apiNote: UpdateNoteModel = {
        id: note.id,
        text: note.text,
        type: noteTypeMap[note.type], // Convert type string to number
        reminder: note.reminder,
        dueDate: note.dueDate,
        isComplete: note.isComplete,
        url: note.url
      };
      note = apiNote;
      console.log('modified note',note);
      
      this.noteService.updateNote(note).subscribe(
        response => {
          console.log('Note Updated Successfully', response);
          this.selectedNote = null;
          this.fetchDashboardNotes(); // Refresh notes
        },
        error => {
          console.error('Error updating note', error);
        }
      );
    } else {
      this.selectedNote = null;
    }
  }
}






