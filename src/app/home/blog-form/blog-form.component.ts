import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input, OnChanges} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Entry } from '../blog-list/blog-list.component';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class BlogFormComponent implements OnChanges {

  @Input() editEntry: Entry | null = null;
  @Input() entries: Entry[] = [];
  @Output() eintragErstellt = new EventEmitter<Entry>();

  titel: string = '';
  image: string = '';
  text: string = '';
  titelLeerFehler: boolean = false;    
  titelDoppeltFehler: boolean = false; 
  imageFehler: boolean = false;
  imageAdresseUngueltig: boolean = false;

  private istGueltigeUrl(url: string): boolean {
    const urlRegex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(url);
  }

  ngOnChanges(): void {
    if (this.editEntry) {
      this.titel = this.editEntry.titel;
      this.image = this.editEntry.image;
      this.text = this.editEntry.text ?? '';
    } else {
      this.titel = '';
      this.image = '';
      this.text = '';
    }
  }

  onSubmit() {
    this.titelLeerFehler = false;
    this.titelDoppeltFehler = false;
    this.imageFehler = false;
    this.imageAdresseUngueltig = false;
  
    const titelExistiert = this.entries.some(entry =>
      entry.titel.trim().toLowerCase() === this.titel.trim().toLowerCase()
    );
    
    if (!this.titel.trim()) {
      this.titelLeerFehler = true;
      return;
    }

    if (!this.image.trim()) {
      this.imageFehler = true;
      return;
    }

    if (!this.istGueltigeUrl(this.image.trim())) {
      this.imageAdresseUngueltig = true;
      return;
    }

    if (titelExistiert && (!this.editEntry || this.editEntry.titel !== this.titel.trim())) {
      this.titelDoppeltFehler = true;
      return;
    }
  
    if (this.titel.trim() && this.image.trim()) {
      const aktion = this.editEntry ? 'aktualisieren' : 'erstellen';
      const bestaetigung = confirm(`Möchten Sie diesen Eintrag ${aktion}?`);
      if (!bestaetigung) return;
  
      const neuerEintrag: Entry = {
        titel: this.titel,
        image: this.image,
        text: this.text.trim() || undefined
      };
  
      this.eintragErstellt.emit(neuerEintrag);
  
      this.titel = '';
      this.image = '';
      this.text = '';
    }
  }
}