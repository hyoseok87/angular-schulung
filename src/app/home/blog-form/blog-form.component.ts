import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Entry } from '../blog-list/blog-list.component';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class BlogFormComponent implements OnChanges {

  @Input() editEntry: Entry | null = null;
  @Input() entries: Entry[] = [];
  @Output() eintragErstellt = new EventEmitter<Entry>();

  myForm: FormGroup = new FormGroup({
    titel: new FormControl('', [
      Validators.required,
      this.titelDoppeltValidator.bind(this)
    ]),
    image: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(https?:\/\/)[^\s/$.?#].[^\s]*$/i)
    ]),
    text: new FormControl('')
  });

  ngOnChanges(): void {
    if (this.editEntry) {
      this.myForm.setValue({
        titel: this.editEntry.titel,
        image: this.editEntry.image,
        text: this.editEntry.text ?? ''
      });
    } else {
      this.myForm.reset();
    }
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const bestaetigung = confirm(`Möchten Sie diesen Eintrag ${this.editEntry ? 'aktualisieren' : 'erstellen'}?`);
    if (!bestaetigung) return;

    const neuerEintrag: Entry = {
      titel: this.myForm.value.titel,
      image: this.myForm.value.image,
      text: this.myForm.value.text?.trim() || undefined
    };

    this.eintragErstellt.emit(neuerEintrag);
    this.myForm.reset();
  }
  
  hasError(controlName: string, errorCode: string): boolean {
    const control = this.myForm.get(controlName);
    return !!(control && control.hasError(errorCode) && control.touched);
  }

  normalisiereTitel(text: string | null | undefined ): string {
    return text ? text.trim().toLowerCase() : '';
  }
  
  titelDoppeltValidator(control: AbstractControl): ValidationErrors | null {
    const eingabe = this.normalisiereTitel(control.value);
  
    const existiert = this.entries!.some((e: Entry) =>
      this.normalisiereTitel(e.titel) === eingabe
    );
  
    if (this.editEntry && this.normalisiereTitel(this.editEntry.titel) === eingabe) {
      return null;
    }
    return existiert ? { doppelt: true } : null;
  }


}