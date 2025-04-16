import { DataService } from './../data.service';
import { BlogFormComponent } from './../blog-form/blog-form.component';
import { Component } from '@angular/core';
import { BlogEntryComponent } from "./blog-entry/blog-entry.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

export interface Entry {
  id?: string | number;
  titel: string;
  image: string;
  text?: string;
}

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
  standalone: true,
  imports: [CommonModule, BlogEntryComponent, BlogFormComponent, FormsModule, MatSnackBarModule]
})
export class BlogListComponent  {

  // 데이터 배열과 상태 변수들
  entries: Entry[] = [];
  editEntry: Entry | null = null;
  selectedIndex: number = 0;
  showForm: boolean = false;
  editModus: boolean = false;

    // DataService를 의존성 주입으로 사용
    constructor(private dataService: DataService, private snackBar: MatSnackBar){}

  // 내부에서 선택된 제목을 관리 (getter/setter 사용)
  private _selectedTitel: string = '';
  get selectedTitel(): string {
    return this._selectedTitel;
  }
  set selectedTitel(titel: string) {
    this._selectedTitel = titel;
    // entries에서 해당 제목을 찾아 selectedIndex를 갱신
    const index = this.entries.findIndex(e => e.titel === titel);
    if (index !== -1) {
      this.selectedIndex = index;
    }
  }

  // 현재 선택된 entry를 반환 (selectedIndex를 기준으로)
  get entry(): Entry {
    return this.entries[this.selectedIndex];
  }

  // entries를 오름차순 정렬하여 반환
  get sortedEntries(): Entry[] {
    return [...this.entries].sort((a, b) =>
      (a.titel ?? '').localeCompare(b.titel ?? '')
    );
  }

  // 폼 토글 함수: 폼 보이기/숨기기
  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.editModus = false;      
      this.editEntry = null;       
    }
  }

  // ngOnInit: 컴포넌트 초기화 시 REST API로부터 데이터를 불러옴
  ngOnInit(): void {
    this.dataService.loadEntries().subscribe((entries) => {
      this.entries = entries;
      if (this.entries.length > 0) {
        // sortedEntries 기준 가장 첫 번째 항목의 제목을 선택함
        this.selectedTitel = this.sortedEntries[0].titel;
      } else {
        this.selectedTitel = '';
      }
    });
  }
  
  // 드롭다운 선택 변경 시 호출됨
  onSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedTitel = selectElement.value;
  }
  
  // 폼에서 새로운 entry 생성 또는 수정 후 호출됨
  onEintragErstellt(neuerEintrag: Entry) {
    if (this.editModus && this.editEntry) {
      neuerEintrag.id = this.editEntry.id;
      this.dataService.updateEntry(neuerEintrag).subscribe(() => {
        this.entries[this.selectedIndex] = neuerEintrag;
        this.showSnackbar('Eintrag wurde erfolgreich aktualisiert!');
      });
    } else {
      this.dataService.addEntry(neuerEintrag).subscribe((saved) => {
        this.entries.push(saved);
        this.selectedIndex = this.entries.length - 1;
        this.showSnackbar('Eintrag wurde erfolgreich erstellt!');
      });
    }
    this.selectedTitel = neuerEintrag.titel;
    this.showForm = false;
    this.editModus = false;
    this.editEntry = null;
  }

  // 편집 모드로 전환: 현재 선택된 entry를 편집 대상으로 지정
  eintragBearbeiten() {
    this.editModus = true;
    this.showForm = true;
    this.editEntry = this.entry;
  }

  // 현재 선택된 entry 삭제 후 데이터 갱신
// ③ 삭제 로직
  eintragLoeschen() {
    if (this.entries.length === 0) return;
    if (!confirm('Möchten Sie diesen Eintrag wirklich löschen?')) return;

    const toDelete = this.entries[this.selectedIndex];
    this.dataService.deleteEntry(toDelete.id!).subscribe(() => {
      this.entries.splice(this.selectedIndex, 1);
      if (this.entries.length > 0) {
        this.selectedTitel = this.sortedEntries[0].titel;
      } else {
        this.selectedIndex = 0;
        this.selectedTitel = '';
      }
    });
  }

  private showSnackbar(message: string) {
    this.snackBar.open(message, 'Schließen', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }
}