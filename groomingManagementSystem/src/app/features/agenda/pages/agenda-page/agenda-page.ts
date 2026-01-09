import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Agenda } from '../../services/agenda';
import { Observable } from 'rxjs';
import { Appointment } from '../../models/appointment.model';
import { Team, TeamAssignee } from '../../../team/services/team';

@Component({
  selector: 'app-agenda-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './agenda-page.html',
  styleUrl: './agenda-page.css',
})
export class AgendaPage {
  private readonly defaultStartTime = '09:00';
  private readonly defaultEndTime = '10:00';

  viewMode: 'week' | 'day' | 'month' = 'week';
  currentDate = new Date();

  readonly hours = Array.from({ length: 11 }, (_, index) => 8 + index);
  readonly weekDayNames = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

  appointments$:Observable<Appointment[]>;
  availableAssignees$: Observable<TeamAssignee[]>;

  isModalOpen = false;
  modalMode: 'create' | 'edit' = 'create';
  selectedAppointment: Appointment | null = null;
  draftAppointment = this.createEmptyDraft();

  constructor(private appointments:Agenda, private team: Team){
    this.appointments$ = this.appointments.getAll();
    this.availableAssignees$ = this.team.getAvailableAssignees(
      this.formatDateInput(this.currentDate)
    );
  }

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

  openCreate(): void {
    this.modalMode = 'create';
    this.selectedAppointment = null;
    this.draftAppointment = this.createDraftForDate(this.currentDate);
    this.refreshAssignees(this.draftAppointment.date);
    this.isModalOpen = true;
  }

  openCreateFromSlot(day: Date, hour: number): void {
    this.modalMode = 'create';
    this.selectedAppointment = null;
    const startTime = `${hour.toString().padStart(2, '0')}:00`;
    const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;
    this.draftAppointment = this.createDraftForDate(day, startTime, endTime);
    this.refreshAssignees(this.draftAppointment.date);
    this.isModalOpen = true;
  }

  openEdit(appointment: Appointment): void {
    this.modalMode = 'edit';
    this.selectedAppointment = appointment;
    this.draftAppointment = this.createDraftFromAppointment(appointment);
    this.refreshAssignees(this.draftAppointment.date);
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  refreshAssignees(dateIso: string): void {
    this.availableAssignees$ = this.team.getAvailableAssignees(dateIso);
  }

  saveAppointment(): void {
    const payload = this.buildAppointmentFromDraft();
    if (this.modalMode === 'edit' && this.selectedAppointment) {
      payload.id = this.selectedAppointment.id;
      this.appointments.editAppointment(payload);
    } else {
      payload.id = `temp-${Date.now()}`;
      this.appointments.addAppointment(payload);
    }
    this.closeModal();
  }

  deleteSelectedAppointment(): void {
    if (this.selectedAppointment) {
      this.appointments.deleteAppointment(this.selectedAppointment.id);
      this.closeModal();
    }
  }

  formatTimeRange(appointment: Appointment): string {
    const start = this.toLocalDate(appointment.startAt);
    const end = this.toLocalDate(appointment.endAt);
    const startLabel = `${start.getHours().toString().padStart(2, '0')}:${start
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
    const endLabel = `${end.getHours().toString().padStart(2, '0')}:${end
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
    return `${startLabel} - ${endLabel}`;
  }

  appointmentStatusClass(status: Appointment['status']): string {
    switch (status) {
      case 'confirmed':
        return 'status-confirmed';
      case 'in-progress':
        return 'status-progress';
      case 'completed':
        return 'status-completed';
      case 'cancelled':
        return 'status-cancelled';
      case 'no-show':
        return 'status-no-show';
      default:
        return 'status-draft';
    }
  }

  getAppointmentsForSlot(
    appointments: Appointment[],
    day: Date,
    hour: number
  ): Appointment[] {
    return appointments.filter((appointment) => {
      const start = this.toLocalDate(appointment.startAt);
      return this.isSameDay(start, day) && start.getHours() === hour;
    });
  }

  getAppointmentsForDay(appointments: Appointment[], day: Date): Appointment[] {
    return appointments.filter((appointment) => {
      const start = this.toLocalDate(appointment.startAt);
      return this.isSameDay(start, day);
    });
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

  private createEmptyDraft(): AppointmentDraft {
    return {
      dogId: '',
      dogName: '',
      ownerName: '',
      serviceType: 'bath',
      status: 'draft',
      date: this.formatDateInput(this.currentDate),
      startTime: this.defaultStartTime,
      endTime: this.defaultEndTime,
      assigneeId: '',
      notes: '',
      requiresTwoPeople: false,
      muzzleRequired: false,
      behavior: 'normale',
    };
  }

  private createDraftForDate(date: Date, startTime?: string, endTime?: string): AppointmentDraft {
    return {
      ...this.createEmptyDraft(),
      date: this.formatDateInput(date),
      startTime: startTime ?? this.defaultStartTime,
      endTime: endTime ?? this.defaultEndTime,
    };
  }

  private createDraftFromAppointment(appointment: Appointment): AppointmentDraft {
    const start = this.toLocalDate(appointment.startAt);
    const end = this.toLocalDate(appointment.endAt);
    return {
      dogId: appointment.dogId ?? '',
      dogName: appointment.dogName ?? '',
      ownerName: appointment.ownerName ?? '',
      serviceType: appointment.serviceType,
      status: appointment.status,
      date: this.formatDateInput(start),
      startTime: this.formatTimeInput(start),
      endTime: this.formatTimeInput(end),
      assigneeId: appointment.teamMemberIds[0] ?? '',
      notes: appointment.notes ?? '',
      requiresTwoPeople: appointment.requiresTwoPeople ?? false,
      muzzleRequired: appointment.muzzleRequired ?? false,
      behavior: appointment.behavior ?? 'normale',
    };
  }

  private buildAppointmentFromDraft(): Appointment {
    const startAt = this.buildIsoDateTime(this.draftAppointment.date, this.draftAppointment.startTime);
    const endAt = this.buildIsoDateTime(this.draftAppointment.date, this.draftAppointment.endTime);
    const plannedDurationMin = this.diffMinutes(startAt, endAt);

    return {
      id: '',
      dogId: this.draftAppointment.dogId || `temp-dog-${Date.now()}`,
      dogName: this.draftAppointment.dogName || 'Nuovo cane',
      ownerName: this.draftAppointment.ownerName || 'Cliente',
      serviceType: this.draftAppointment.serviceType,
      status: this.draftAppointment.status,
      startAt,
      endAt,
      plannedDurationMin,
      baseDurationMin: plannedDurationMin,
      durationMultiplier: 1,
      staffSpeedFactor: 1,
      teamMemberIds: this.draftAppointment.assigneeId
        ? [this.draftAppointment.assigneeId]
        : [],
      requiresTwoPeople: this.draftAppointment.requiresTwoPeople,
      muzzleRequired: this.draftAppointment.muzzleRequired,
      behavior: this.draftAppointment.behavior,
      notes: this.draftAppointment.notes,
      createdAt: new Date().toISOString(),
    };
  }

  private buildIsoDateTime(date: string, time: string): string {
    return new Date(`${date}T${time}:00`).toISOString();
  }

  private diffMinutes(startIso: string, endIso: string): number {
    const diff = this.toLocalDate(endIso).getTime() - this.toLocalDate(startIso).getTime();
    return Math.max(0, Math.round(diff / 60000));
  }

  private formatDateInput(date: Date): string {
    return date.toISOString().slice(0, 10);
  }

  private formatTimeInput(date: Date): string {
    return `${date.getHours().toString().padStart(2, '0')}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  }

  private toLocalDate(iso: string): Date {
    return new Date(iso);
  }

  private isSameDay(first: Date, second: Date): boolean {
    return (
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate()
    );
  }

  private startOfWeek(date: Date): Date {
    const copy = new Date(date);
    const day = copy.getDay();
    const diff = (day + 6) % 7;
    copy.setDate(copy.getDate() - diff);
    return copy;
  }
}

interface AppointmentDraft {
  dogId: string;
  dogName: string;
  ownerName: string;
  serviceType: Appointment['serviceType'];
  status: Appointment['status'];
  date: string;
  startTime: string;
  endTime: string;
  assigneeId: string;
  notes: string;
  requiresTwoPeople: boolean;
  muzzleRequired: boolean;
  behavior: Appointment['behavior'];
}
