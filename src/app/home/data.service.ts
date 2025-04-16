import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entry } from './blog-list/blog-list.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // JSON‑Server REST Endpoint
  private apiUrl = 'http://localhost:3000/entries';

  constructor(private http: HttpClient) {}

  loadEntries(): Observable<Entry[]> {
    return this.http.get<Entry[]>(this.apiUrl);
  }

  addEntry(entry: Entry): Observable<Entry> {
    return this.http.post<Entry>(this.apiUrl, entry);
  }

  updateEntry(entry: Entry): Observable<Entry> {
    return this.http.put<Entry>(`${this.apiUrl}/${entry.id}`, entry);
  }

  deleteEntry(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}