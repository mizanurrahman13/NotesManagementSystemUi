import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateNoteModel, NoteType } from '../../models/create-note.model';

@Component({
  selector: 'app-create-note',
  standalone: false,
  
  templateUrl: './create-note.component.html',
  styleUrl: './create-note.component.css'
})
export class CreateNoteComponent implements OnInit {
  noteForm: FormGroup;
  noteTypes = Object.values(NoteType);

  constructor(private fb: FormBuilder) {
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
      console.log('Note Created:', newNote);
      // Implement logic to save the note
    } else {
      console.log('Form is invalid');
    }
  }
}
