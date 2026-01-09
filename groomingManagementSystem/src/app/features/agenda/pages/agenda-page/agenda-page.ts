import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-agenda-page',
  imports: [CommonModule],
  templateUrl: './agenda-page.html',
  styleUrl: './agenda-page.css',
})
export class AgendaPage {
  viewMode: 'week' | 'day' | 'month' = 'week';
  currentDate = new Date();

  readonly hours = Array.from({ length: 11 }, (_, index) => 8 + index);
  readonly weekDayNames = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

  setView(mode: 'week' | 'day' | 'month'): void {
    this.viewMode = mode;
  }

  prevPeriod(): void {
    if (this.viewMode === 'day') {
      this.currentDate = this.addDays(this.currentDate, -1);
      return;
    }

    if (this.viewMode === 'week') {
      this.currentDate = this.addDays(this.currentDate, -6);
      return;
    }

    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1,
      1
    );
  }

  nextPeriod(): void {
    if (this.viewMode === 'day') {
      this.currentDate = this.addDays(this.currentDate, 1);
      return;
    }

    if (this.viewMode === 'week') {
      this.currentDate = this.addDays(this.currentDate, 6);
      return;
    }

    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      1
    );
  }

  setToday(): void {
    this.currentDate = new Date();
  }

  get displayDays(): Date[] {
    if (this.viewMode === 'day') {
      return [this.currentDate];
    }

    return this.weekDays;
  }

  get weekDays(): Date[] {
    const start = this.startOfWeek(this.currentDate);
    return Array.from({ length: 6 }, (_, index) => this.addDays(start, index));
  }

  get monthGrid(): Date[] {
    const startOfMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      1
    );
    const startOffset = (startOfMonth.getDay() + 6) % 7;
    const gridStart = this.addDays(startOfMonth, -startOffset);
    const cells = 42;

    return Array.from({ length: cells }, (_, index) => this.addDays(gridStart, index));
  }

  get toolbarTitle(): string {
    if (this.viewMode === 'day') {
      return this.currentDate.toLocaleDateString('it-IT', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
      });
    }

    if (this.viewMode === 'month') {
      return this.currentDate.toLocaleDateString('it-IT', {
        month: 'long',
        year: 'numeric',
      });
    }

    const weekStart = this.startOfWeek(this.currentDate);
    const weekEnd = this.addDays(weekStart, 5);
    const startLabel = weekStart.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: 'short',
    });
    const endLabel = weekEnd.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: 'short',
    });

    return `Settimana ${startLabel} - ${endLabel}`;
  }

  formatDayLabel(date: Date): string {
    const label = date.toLocaleDateString('it-IT', {
      weekday: 'short',
      day: '2-digit',
    });
    return label.charAt(0).toUpperCase() + label.slice(1);
  }

  formatHour(hour: number): string {
    return `${hour.toString().padStart(2, '0')}:00`;
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }

  private addDays(date: Date, days: number): Date {
    const copy = new Date(date);
    copy.setDate(copy.getDate() + days);
    return copy;
  }

  private startOfWeek(date: Date): Date {
    const copy = new Date(date);
    const day = copy.getDay();
    const diff = (day + 6) % 7;
    copy.setDate(copy.getDate() - diff);
    return copy;
  }
}
