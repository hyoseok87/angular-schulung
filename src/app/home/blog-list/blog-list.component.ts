import { DataService } from './../data.service';
import { BlogFormComponent } from './../blog-form/blog-form.component';
import { Component } from '@angular/core';
import { BlogEntryComponent } from "./blog-entry/blog-entry.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


export interface Entry {
  titel: string;
  image: string;
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
  editEntry: Entry | null = null;
  selectedIndex: number = 0;
  showForm: boolean = false;
  editModus: boolean = false;

  private _selectedTitel: string = '';
  
  get selectedTitel(): string {
    return this._selectedTitel;
  }

  set selectedTitel(titel: string) {
    this._selectedTitel = titel;
    const index = this.entries.findIndex(e => e.titel === titel);
    if (index !== -1) {
      this.selectedIndex = index;
    }
  }

  get entry(): Entry {
    return this.entries[this.selectedIndex];
  }

  get sortedEntries(): Entry[] {
    return [...this.entries].sort((a, b) =>
      a.titel.localeCompare(b.titel)
    );
  }

  constructor(private dataService: DataService){}


  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.editModus = false;      
      this.editEntry = null;       
    }
  }

  ngOnInit(): void {
    this.entries = this.dataService.loadEntries();
    if (this.entries.length > 0) {
      this.selectedTitel = this.sortedEntries[0].titel;
    } else {
      this.selectedTitel = '';
    }
  }
  onSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedTitel = selectElement.value;
  }
  
  onEintragErstellt(neuerEintrag: Entry) {
    if (this.editModus && this.editEntry) {
      this.entries[this.selectedIndex] = neuerEintrag;
    } else {
      this.entries.push(neuerEintrag);
      this.selectedIndex = this.entries.length - 1;
    }

    this.selectedTitel = neuerEintrag.titel;
    this.dataService.saveEntries(this.entries);
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
    const bestaetigungdesLöschen = confirm('Möchten Sie diesen Eintrag wirklich löschen?');
    if (!bestaetigungdesLöschen) return;

    this.entries.splice(this.selectedIndex, 1);
    if (this.entries.length > 0) {
      this.selectedTitel = this.sortedEntries[0].titel;
    } else {
      this.selectedIndex = 0;
      this.selectedTitel = '';
    }
    this.dataService.saveEntries(this.entries);
  }
}