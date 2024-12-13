import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateNoteModel, NoteType } from '../../models/create-note.model';
import { ToastComponent } from '../toast/toast.component';
import { NoteService } from '../../services/note/note.service';

@Component({
  selector: 'app-create-note',
  standalone: false,
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css'] // Correct property name
})
export class CreateNoteComponent implements OnInit {
  noteForm: FormGroup;
  noteTypes = Object.values(NoteType);
  @ViewChild(ToastComponent) toast!: ToastComponent; // Access the ToastComponent

  constructor(private fb: FormBuilder, private noteService: NoteService) {
    this.noteForm = this.fb.group({
      text: ['', Validators.required],
      type: [NoteType.Regular, Validators.required],
      reminder: [null],
      dueDate: [null],
      isComplete: [false],
      url: ['', Validators.pattern('https?://.+')]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.noteForm.valid) {
      const newNote: CreateNoteModel = this.noteForm.value;

      this.noteService.createNote(newNote).subscribe(
        response => {
          console.log('Note Created Successfully', response);
          this.toast.showMessage(response.message || 'Note created successfully'); // Show success toast
        },
        error => {
          console.error('Error creating note', error);
          this.toast.showMessage('Error creating note'); // Show error toast
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
