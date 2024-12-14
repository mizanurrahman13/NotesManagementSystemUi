// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-sign-up',
//   standalone: false,
  
//   templateUrl: './sign-up.component.html',
//   styleUrl: './sign-up.component.css'
// })
// export class SignUpComponent implements OnInit{

//   registrationForm: FormGroup; 
//   constructor(private fb: FormBuilder) {
//      this.registrationForm = this.fb.group({ 
//       username: ['', [Validators.required, Validators.minLength(3)]], 
//       email: ['', [Validators.required, Validators.email]], 
//       password: ['', [Validators.required, Validators.minLength(3)]] }); 
//     } 
    
//     ngOnInit(): void { } 
    
//     onSubmit(): void { 
//       if (this.registrationForm.valid) { 
//         console.log('Form Submitted', this.registrationForm.value); 
//       } else { console.log('Form is invalid'); 
        
//       }
//      }
// }

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/auth/user.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ToastComponent } from '../../components/toast/toast.component';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registrationForm: FormGroup;
  @ViewChild(ToastComponent) toast!: ToastComponent; // Access the ToastComponent

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      dateOfBirth: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const formData = {
        ...this.registrationForm.value,
        dateOfBirth: new Date(this.registrationForm.value.dateOfBirth)
      };

      this.userService.registerUser(formData).subscribe(
        (response: HttpResponse<string>) => {
          console.log('Raw Response:', response); // Log entire response for debugging
          console.log('Response Body:', response.body); // Log response body

          if (response.status === 200 && response.body) {
            try {
              const body = JSON.parse(response.body);
              this.toast.showMessage(body.message || 'Success'); // Show success toast
              console.log(body.message);
            } catch (error) {
              console.error('Error parsing JSON response:', error);
              this.toast.showMessage('Error parsing response'); // Show parsing error toast
            }
          } else {
            this.toast.showMessage('Unexpected response format or status code'); // Show error toast
          }
        },
        (error: HttpErrorResponse) => {
          console.error('HttpErrorResponse:', error);
          if (error.status === 400) {
            this.toast.showMessage(error.error.message || 'Email already exists.'); // Show error toast
          } else {
            this.toast.showMessage('Error submitting form'); // Show error toast
          }
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}

















