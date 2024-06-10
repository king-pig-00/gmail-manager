import {
  ChangeDetectorRef,
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';

import { CalendarModule, CalendarView, CalendarEvent } from 'angular-calendar';

import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { UIState, ToDoListState } from './state';
import { AddNewToDoListModalComponent } from './components';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule,
    ButtonModule,
    ButtonModule,
    TooltipModule,
    AddNewToDoListModalComponent,
  ],
  providers: [UIState, ToDoListState],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class ToDoListComponent {
  uiState = inject(UIState);
  //   events: CruiseEvents[] = [];
  //   viewDate: Date = this.setToSunday(new Date());
  //   CalendarView = CalendarView;
  //   view: CalendarView = CalendarView.Month;
  //   ngOnInit() {}
  //   visible: boolean = false;
  //   showDialog() {
  //     this.visible = true;
  //   }
  //   showBettingForm() {}
  //   calendarEvents$ = this.calendarScheduleState.calendarEvents$.pipe(
  //     map((res) => {
  //         return res.map((item) => {
  //             const inputString = item.title;
  //             // check if its in Ovation of the Seas 07:00 AM-05:00 PM format
  //             const regex = /(\d{2}:\d{2} [APM]{2})/g;
  //             // find patterns
  //             const matches = inputString.match(regex);
  //             //assign the end time to variable
  //             let endTime = null;
  //             if (matches && matches.length >= 2) {
  //                 endTime = matches[1]; // Assuming the second match is the end time (05:00 PM)
  //             }
  //             // use the start of the event to find dat
  //             const dateTimeString = item.start;
  //             const date = dateTimeString.split('T')[0];
  //             const endEvent = `${date}T${endTime}`;
  //             const inputDateTimeStr = endEvent;
  //             // Split the input string into date and time parts
  //             const [datePart, timePart] = inputDateTimeStr.split('T');
  //             const [time, ampm] = timePart.split(' ');
  //             // Split the date into year, month, and day
  //             const [year, month, day] = datePart.split('-');
  //             // Split the time into hours and minutes
  //             const [hours, minutes] = time.split(':');
  //             // Convert hours to 24-hour format if PM (we need to check against null times)
  //             const adjustedHours =
  //                 ampm?.toLowerCase() === 'pm'
  //                     ? (parseInt(hours) + 12).toString()
  //                     : hours;
  //             // Create a new Date object in the desired format "2023-09-27T07:00:00"
  //             const outputDateTimeStr = `${year}-${month}-${day}T${adjustedHours}:${minutes}:00`;
  //             const match = item.title.match(/^(.*?) - (.*?)\n(.*?)$/);
  //             // if there is a dock assignment
  //             if (item.title.includes('-') && match) {
  //                 const cruiseTitle = match[1].trim();
  //                 const dockAssignment = match[2].trim();
  //                 const cruiseTime = match[3].trim();
  //                 return {
  //                     id: item.id.toString(),
  //                     start: new Date(item.start),
  //                     end: new Date(outputDateTimeStr),
  //                     title: item.title,
  //                     color: {
  //                         primary: item.color,
  //                         secondary: item.backgroundColor,
  //                     },
  //                     meta: {
  //                         dockId: item.dockId,
  //                         cruiseLine: cruiseTitle,
  //                         cruiseTime: cruiseTime,
  //                         dockAssignment: dockAssignment,
  //                         date: date,
  //                         description: item.description,
  //                         className: item.className,
  //                         url: item.url,
  //                         portId: item.portId,
  //                         tourInventoryAllocatedSeats:
  //                             item.tourInventoryAllocatedSeats,
  //                         totalBooking: item.totalBooking,
  //                     },
  //                 };
  //             } else {
  //                 return {
  //                     id: item.id.toString(),
  //                     start: new Date(item.start),
  //                     end: new Date(outputDateTimeStr),
  //                     title: item.title,
  //                     color: {
  //                         primary: item.color,
  //                         secondary: item.backgroundColor,
  //                     },
  //                     meta: {
  //                         dockId: item.dockId,
  //                         cruiseLine: item.title.split('\n')[0],
  //                         cruiseTime: item.title.split('\n')[1],
  //                         date: date,
  //                         description: item.description,
  //                         className: item.className,
  //                         url: item.url,
  //                         portId: item.portId,
  //                         tourInventoryAllocatedSeats:
  //                             item.tourInventoryAllocatedSeats,
  //                         totalBooking: item.totalBooking,
  //                     },
  //                 };
  //             }
  //         });
  //     })
  // );
  //   private setToSunday(date: Date): Date {
  //     const day = date.getDay(),
  //         diff = date.getDate() - day;
  //     return new Date(date.setDate(diff));
  // }

  openAddNewModal() {
    this.uiState.openAddNewToDoListModal();
  }
}
