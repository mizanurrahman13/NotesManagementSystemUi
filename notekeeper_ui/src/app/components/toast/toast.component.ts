import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  imports: [CommonModule],
})
export class ToastComponent {
  message: string = '';
  isVisible: boolean = false;

  showMessage(message: string) {
    this.message = message;
    this.isVisible = true;
    setTimeout(() => this.isVisible = false, 3000); // Hide after 3 seconds
  }
}
