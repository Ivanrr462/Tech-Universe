import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronLeft, ChevronRight } from 'lucide-angular';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './pagination.html',
})
export class Pagination {
  @Input() currentPage = 1;
  @Input() lastPage = 1;
  @Output() pageChange = new EventEmitter<number>();

  readonly ChevronLeftIcon = ChevronLeft;
  readonly ChevronRightIcon = ChevronRight;

  prev(): void {
    if (this.currentPage > 1) this.pageChange.emit(this.currentPage - 1);
  }

  next(): void {
    if (this.currentPage < this.lastPage) this.pageChange.emit(this.currentPage + 1);
  }
}
