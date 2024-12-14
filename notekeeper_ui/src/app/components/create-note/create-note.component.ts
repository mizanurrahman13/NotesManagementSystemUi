import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateNoteModel, NoteType } from '../../models/create-note.model';
import { ToastComponent } from '../toast/toast.component';
import { NoteService } from '../../services/note/note.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-note',
  standalone: false,
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {
  noteForm: FormGroup;
  noteTypes = Object.values(NoteType);
  @ViewChild(ToastComponent) toast!: ToastComponent;

  constructor(private fb: FormBuilder, private noteService: NoteService, private router: Router) {
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
      const formData = this.noteForm.value;

      // Map note type string to corresponding numeric value
      const noteTypeMap: { [key: string]: number } = {
        [NoteType.Regular]: 0,
        [NoteType.Reminder]: 1,
        [NoteType.Todo]: 2,
        [NoteType.Bookmark]: 3
      };

      // Create the API note model with the correct type mapping
      const apiNote: CreateNoteModel = {
        //id: 0, // Set id to 0
        text: formData.text,
        type: noteTypeMap[formData.type], // Convert type string to number
        reminder: formData.reminder,
        dueDate: formData.dueDate,
        isComplete: formData.isComplete,
        url: formData.url
      };

      console.log('Request Payload:', apiNote); // Log the request payload

      this.noteService.createNote(apiNote).subscribe(
        response => {
          console.log('Note Created Successfully', response);
          this.toast.showMessage(response.message || 'Note created successfully'); // Show success toast
          this.router.navigate(['/note-list']); // Redirect to note-list module
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
