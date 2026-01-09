import { Injectable } from '@angular/core';
import { APPOINTMENTS_MOCK } from '../mock/appointments.mock';
import { Appointment } from '../models/appointment.model';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Agenda {
  private readonly teamMembers = APPOINTMENTS_MOCK;

  getAll(): Observable<Appointment[]> {
    return of(this.teamMembers);
  }

  getById(id: string | null): Observable<Appointment | undefined> {
    return of(this.teamMembers.find((c) => c.id === id));
  };

  addAppointment(appointment:Appointment){
    console.log("Appuntamento aggiunto",appointment)
  }

  editAppointment(appointmentData:Object){
    console.log("Appuntamento modificato",appointmentData);
  }

  deleteAppointment(appointmentId:string){
    console.log("Appuntamento cancellato", appointmentId);
  }
}
