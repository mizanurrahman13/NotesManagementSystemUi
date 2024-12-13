import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './auth/signin/signin.component';
import { CreateNoteComponent } from './components/create-note/create-note.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastComponent } from './components/toast/toast.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'create-note', component: CreateNoteComponent },
  { path: 'note-list', component: NoteListComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SigninComponent,
    CreateNoteComponent,
    NoteListComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastComponent,
    CommonModule,
    RouterModule.forRoot(routes) // Add RouterModule to imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
