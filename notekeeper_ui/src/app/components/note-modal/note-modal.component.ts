import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateNoteModel } from '../../models/create-note.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-modal',
  templateUrl: './note-modal.component.html',
  styleUrls: ['./note-modal.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class NoteModalComponent implements OnChanges {
  @Input() note: UpdateNoteModel | null = null; // Mark as possibly null and provide default value
  @Output() update = new EventEmitter<UpdateNoteModel | null>();
  noteForm: FormGroup;
  noteTypes = ['Regular', 'Reminder', 'Todo', 'Bookmark'];

  constructor(private fb: FormBuilder) {
    this.noteForm = this.fb.group({
      text: ['', Validators.required],
      type: ['Regular', Validators.required],
      reminder: [null],
      dueDate: [null],
      isComplete: [false],
      url: ['', Validators.pattern('https?://.+')]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.note) {
      this.noteForm.patchValue(this.note);
    }
  }

  onUpdate(): void {
    if (this.noteForm.valid) {
      const updatedNote: UpdateNoteModel = {
        ...this.note!,
        ...this.noteForm.value
      };
      this.update.emit(updatedNote);
    }
  }

  onCancel(): void {
    this.update.emit(null);
  }
}
