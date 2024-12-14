import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateNoteModel, UpdateNoteModel } from '../../models/create-note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private apiUrl = 'http://localhost:5005/api/Notes';
  

  constructor(private http: HttpClient) {}

  createNote(note: CreateNoteModel): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(this.apiUrl, note, { headers });
  }

  updateNote(note: UpdateNoteModel): Observable<any> { 
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({ 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}` 
    }); 
    
    return this.http.put<any>(`${this.apiUrl}/${note.id}`, note, { headers });
 }

  getDashboardNotes(): Observable<any> { 
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({ 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}` 
    }); 
    
    return this.http.get<any>(`${this.apiUrl}/dashboard`, { headers }); }
}
