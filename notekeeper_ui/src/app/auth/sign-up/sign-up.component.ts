import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit{

  registrationForm: FormGroup; 
  constructor(private fb: FormBuilder) {
     this.registrationForm = this.fb.group({ 
      username: ['', [Validators.required, Validators.minLength(3)]], 
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(3)]] }); 
    } 
    
    ngOnInit(): void { } 
    
    onSubmit(): void { 
      if (this.registrationForm.valid) { 
        console.log('Form Submitted', this.registrationForm.value); 
      } else { console.log('Form is invalid'); 
        
      }
     }
}
