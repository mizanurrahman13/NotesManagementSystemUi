import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/auth/user.service';

@Component({
  selector: 'app-signin',
  standalone: false,
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signinForm.valid) {
      const formData = this.signinForm.value;

      this.userService.loginUser(formData).subscribe(
        response => {
          console.log('Login Successful', response);
          localStorage.setItem('token', response.token); // Save token to localStorage
          this.router.navigate(['/note-list']); // Redirect to note-list module
        },
        error => {
          console.error('Error logging in', error);
          // Handle login error
        }
      );
    } else {
      console.log('Signin Form is invalid');
    }
  }
}
