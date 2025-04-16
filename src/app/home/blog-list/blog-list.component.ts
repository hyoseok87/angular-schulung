import { BlogFormComponent } from './../blog-form/blog-form.component';
import { Component } from '@angular/core';
import { BlogEntryComponent } from "./blog-entry/blog-entry.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Entry {
  image: string;
  titel: string;
  text?: string;
}

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
  standalone: true,
  imports: [CommonModule, BlogEntryComponent, BlogFormComponent, FormsModule]
})
export class BlogListComponent  {

  entries: Entry[] = [];
  entry!: Entry;
  editEntry: Entry | null = null;
  selectedIndex: number = 0;
  showForm: boolean = false;
  editModus: boolean = false;

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.editModus = false;      
      this.editEntry = null;       
    }
  }

  ngOnInit(): void {
    const gespeicherteEintraege = localStorage.getItem('blogEintraege');
    this.entries = gespeicherteEintraege ? JSON.parse(gespeicherteEintraege) : [];
  
    if (this.entries.length > 0) {
      this.entry = this.entries[this.selectedIndex];
    } else {
      this.entry = { titel: '', image: '', text: '' };
    }
  }
  onSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const index = parseInt(selectElement.value, 10);
    this.entry = this.entries[index];
    this.selectedIndex = index;
  }
  
  onEintragErstellt(neuerEintrag: Entry) {
    if (this.editModus && this.editEntry) {
      this.entries[this.selectedIndex] = neuerEintrag;
    } else {
      this.entries.push(neuerEintrag);
      this.selectedIndex = this.entries.length - 1;
    }
  
    this.entry = this.entries[this.selectedIndex];
    localStorage.setItem('blogEintraege', JSON.stringify(this.entries));
    this.showForm = false;
    this.editModus = false;
    this.editEntry = null;
  }

  eintragBearbeiten() {
    this.editModus = true;
    this.showForm = true;
    this.editEntry = this.entry;
  }

  eintragLoeschen() {
    if (this.entries.length === 0) return;
    const bestaetigungdesLöschen = confirm ('Möchten Sie diesen Eintrag wirklich löschen?')
    if (!bestaetigungdesLöschen) return;

    this.entries.splice(this.selectedIndex, 1);
    if (this.entries.length > 0) {
      this.selectedIndex = 0;
      this.entry = this.entries[0];
    } else {
      this.selectedIndex = 0;
      this.entry = { titel: '', image: '', text: '' };
    }
    localStorage.setItem('blogEintraege', JSON.stringify(this.entries));
  }
}