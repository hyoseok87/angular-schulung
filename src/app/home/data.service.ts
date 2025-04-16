import { Injectable } from '@angular/core';
import { Entry } from './blog-list/blog-list.component';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private localStorageKey = 'blogEintraege';

  loadEntries(): Entry[] {
    const data = localStorage.getItem(this.localStorageKey);
    return data ? JSON.parse(data) : [];
  }

  saveEntries(entries: Entry[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(entries));
  }

  constructor() { }

}
